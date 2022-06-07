package com.sap.refapps.espm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sap.cloud.security.xsuaa.token.SpringSecurityContext;
import com.sap.cloud.security.xsuaa.token.Token;
import com.sap.cloud.security.xsuaa.tokenflows.TokenFlowException;
import com.sap.refapps.espm.model.SalesOrder;
import com.sap.refapps.espm.service.SalesOrderService;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.RestTemplate;

import javax.jms.JMSException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * This class is a controller class of sales service which is responsible for
 * handling all endpoints.
 *
 */
@RestController
@RequestMapping("sale.svc/api/v1/salesOrders")
public class SalesOrderController {
	@Value("${product.service}")
	private String productServiceEndPoint;
	protected static final String V1_PATH = "/v1/salesOrders";
	private static final Logger logger = LoggerFactory.getLogger(SalesOrderController.class);

	private final HttpHeaders headers = new HttpHeaders();

	@Autowired
	private SalesOrderService salesOrderService;

	private SalesOrder salesorder;

	@Autowired
	private Environment environment;
	private RequestCallback requestCallback;

	/**
	 * It creates a sales order
	 * 
	 * @param salesOrder
	 * @return ResponseEntity<String> message
	 */
	@PostMapping
	public ResponseEntity<String> createSalesOrder(@RequestBody final SalesOrder salesOrder)
			throws UnsupportedEncodingException, JMSException, JsonProcessingException {
		String soId = UUID.randomUUID().toString();
		salesOrder.setSalesOrderId(soId);

		//salesOrderService.insert(salesOrder);
		if (Arrays.stream(environment.getActiveProfiles()).anyMatch(env -> env.equalsIgnoreCase("local"))) {
			if (!salesOrderService.insert(salesOrder, "local"))
				return errorMessage("Service is currently unavailable", HttpStatus.SERVICE_UNAVAILABLE);
		} else if (Arrays.stream(environment.getActiveProfiles()).anyMatch(env -> env.equalsIgnoreCase("cloud"))) {
			salesOrderService.insert(salesOrder);
		}

		return new ResponseEntity<>("Sales Order with ID " + soId + " created", HttpStatus.ACCEPTED);
	}

	/**
	 * update sales order
	 * 
	 * @param salesOrderId, status
	 * @return ResponseEntity<String> message
	 * @throws JSONException
	 */
	@PutMapping("/{salesOrderId}/{statusCode}")
	@ResponseBody
	public ResponseEntity<String> updateSalesOrder(@PathVariable("salesOrderId") final String salesOrderId,
												   @PathVariable("statusCode") String statusCode, @RequestBody String payload,
												   RequestEntity<String> requestEntity) throws JSONException, IllegalArgumentException, TokenFlowException {
		logger.info("Payload:"+payload + " "+ payload.getClass());
		JSONObject jsonObject = new JSONObject(payload);
		logger.info("json Payload:"+jsonObject);
		String shippedFrom = jsonObject.get("shippedFrom").toString();
		String shippedTo = jsonObject.get("shippedTo").toString();
		logger.info("Params:"+shippedFrom+" "+shippedFrom.getClass()+ " "+shippedTo+" "+shippedTo.getClass());
		String note = jsonObject.get("note").toString();
		if (salesOrderService.getById(salesOrderId) != null) {

			final String productId = salesOrderService.getById(salesOrderId).getProductId();
			final BigDecimal quantity = salesOrderService.getById(salesOrderId).getQuantity();
			if (statusCode.equalsIgnoreCase("S")) {
				try {
					if (Arrays.stream(environment.getActiveProfiles()).anyMatch(env -> env.equalsIgnoreCase("cloud"))) {
						Token jwtToken = SpringSecurityContext.getToken();
						String appToken = jwtToken.getAppToken();
						headers.set("Authorization", "Bearer " + appToken);
					}
					headers.set("Content-Type", "application/json");
					ResponseEntity<String> response = updateStock(productId, quantity);
					if (response.getStatusCodeValue() == 200) {
						note = callLogistics(shippedFrom, shippedTo, note);
						salesOrderService.updateStatus(salesOrderId, statusCode, note);
					} else if (response.getStatusCodeValue() == 204) {
						statusCode = "C";
						note = "Out of Stock";
						salesOrderService.updateStatus(salesOrderId, statusCode, note);
						return errorMessage("Out of stock" + productId, HttpStatus.NO_CONTENT);
					}
				}

				catch (Exception e) {
					return errorMessage(e.getMessage() + " " + productId, HttpStatus.BAD_REQUEST);
				}
			} else if (statusCode.equalsIgnoreCase("R")) {
				statusCode = "R";
				note = "Rejected by Retailer";
				salesOrderService.updateStatus(salesOrderId, statusCode, note);
			}
			return new ResponseEntity<>("Sales Order with ID " + salesOrderId + " updated", HttpStatus.OK);

		} else {

			return errorMessage("SalesOrder not found", HttpStatus.NOT_FOUND);
		}
	}

	public String callLogistics(String shippedFrom, String shippedTo, String note) {
		if (Arrays.stream(environment.getActiveProfiles()).anyMatch(env -> env.equalsIgnoreCase("cloud"))) {
			logger.info("CURRENT PROFILE: CLOUD");
			return salesOrderService.getShipmentMode(shippedFrom, shippedTo, note);
		}
		logger.info("CURRENT PROFILE: LOCAL");
		return salesOrderService.getShipmentModeForLocal(shippedFrom, shippedTo, note);

		/*HttpEntity<String> entity = new HttpEntity<>(headers);
		Map<String, Object> params = new HashMap<>();
		params.put("shippedFrom", shippedFrom);
		params.put("shippedTo", shippedTo);
		logger.info("PARAMS {}", params);
		logger.info("HEADERS {} ", entity.getHeaders());
		logger.info("BODY {} ", entity.getBody());

		String url = getLogisticsServiceEndpoint()+"?shippedFrom="+shippedFrom+"&"+"shippedTo="+shippedTo;

		logger.info("URL:"+ url);
		HttpURLConnection httpClient = null;
		try {
			httpClient = (HttpURLConnection) new URL(url).openConnection();

			httpClient.setRequestMethod("GET");

			//add request header
			httpClient.setRequestProperty("User-Agent", "Mozilla/5.0");

			int responseCode = httpClient.getResponseCode();
			logger.info("\nSending 'GET' request to URL : " + url);
			logger.info("Response Code : " + responseCode);

			try (BufferedReader in = new BufferedReader(
					new InputStreamReader(httpClient.getInputStream()))) {

				StringBuilder response = new StringBuilder();
				String line;

				while ((line = in.readLine()) != null) {
					response.append(line);
				}

				//print result
				logger.info("Response:"+response.toString());
				String noteFromLogistics = " "+response.toString();
				note = note.concat(noteFromLogistics);
			}
		} catch (IOException e) {
			//ignored
		}
		return note;*/
	}

	private String getLogisticsServiceEndpoint() {
		String prodUrl = this.environment.getProperty("LOGISTICS_SERVICE") + "/api/v1/shipmentmode";

		final String logisticsServiceUrl = Arrays.stream(environment.getActiveProfiles())
												 .anyMatch(env -> (env.equalsIgnoreCase("cloud"))) ? salesOrderService.getLogisticsServiceUri() : prodUrl;
		logger.info("***********Logistics Service end point used in Sales is {}********", logisticsServiceUrl);

		return logisticsServiceUrl;
	}

	private ResponseEntity<String> updateStock(String productId, BigDecimal quantity) {
		RestTemplate restTemplate = new RestTemplate();
		// creation of payload as json object from input
		String quanEdit = "-" + quantity;
		BigDecimal addQuan = new BigDecimal(quanEdit);
		JSONObject updatedStock = new JSONObject();
		updatedStock.put("quantity", addQuan);
		updatedStock.put("productId", productId);
		logger.info("updated stock:", updatedStock);
		final String S_PATH = geProductServiceUri() + productId;
		logger.info("product URL:", S_PATH);
		HttpEntity<String> request = new HttpEntity<>(updatedStock.toString(), headers);

		// call product service
		ResponseEntity<String> response = restTemplate.exchange(S_PATH, HttpMethod.PUT, request,
																String.class);
		response.getStatusCode();
		logger.info("status code:", response.getStatusCode());
		logger.info("get response value:", response.getStatusCodeValue());
		String responseBody = response.getBody();
		logger.info("response body for success", responseBody);
		return response;
	}


	/**
	 * Returns list of sales orders based on customer email.
	 * 
	 * @param customerEmail
	 * @return list of sales order
	 */
	@GetMapping("/email/{customerEmail}")
	public ResponseEntity<Iterable<SalesOrder>> getSalesOrdersByCustomerEmail(
			@PathVariable("customerEmail") final String customerEmail) {

		final Iterable<SalesOrder> salesOrders = salesOrderService.getByEmail(customerEmail);
		if (salesOrders.iterator().hasNext())
			return new ResponseEntity<>(salesOrders, HttpStatus.OK);
		return errorMessage("Customer with email Address " + customerEmail
				+ " not found or customer does not have any sales orders", HttpStatus.NOT_FOUND);
	}

	/**
	 * Returns a sales order based on sales order id.
	 * 
	 * @param salesOrderId
	 * @return sales order
	 */
	@GetMapping("/{salesOrderId}")
	public ResponseEntity<SalesOrder> getSalesOrderById(@PathVariable("salesOrderId") final String salesOrderId) {

		final SalesOrder salesOrders = salesOrderService.getById(salesOrderId);
		if (salesOrders != null)
			return new ResponseEntity<>(salesOrders, HttpStatus.OK);
		return errorMessage("Sales order not found", HttpStatus.NOT_FOUND);
	}

	/**
	 * Returns all sales orders.
	 * 
	 * @return list of sales order
	 */
	@GetMapping
	public ResponseEntity<Iterable<SalesOrder>> getAllSalesOrders() {
		final Iterable<SalesOrder> salesOrders = salesOrderService.getAll();
		return new ResponseEntity<>(salesOrders, HttpStatus.OK);

	}

	/**
	 * It is used to print the error message.
	 * 
	 * @param message
	 * @param status
	 * @return ResponseEntity of status,headers and body
	 */
	private ResponseEntity errorMessage(String message, HttpStatus status) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(org.springframework.http.MediaType.TEXT_PLAIN);
		return ResponseEntity.status(status).headers(headers).body(message);
	}

	private String geProductServiceUri() {
		String prodUrl = this.environment.getProperty("PROD_SERVICE") + "/product.svc/api/v1/stocks/";

		final String productserviceUri = Arrays.stream(environment.getActiveProfiles())
				.anyMatch(env -> (env.equalsIgnoreCase("cloud"))) ? prodUrl : productServiceEndPoint;
		logger.info("***********Productservice end point used in Sales is {}********", productserviceUri);

		return productserviceUri;
	}

}
