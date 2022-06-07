package com.sap.refapps.espm.logisticsservice.controller;

import com.sap.refapps.espm.logisticsservice.service.LogisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/shipmentmode")
public class LogisticsController {

    private final LogisticsService service;

    public LogisticsController(LogisticsService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> getShipmentMode(@RequestParam("shippedFrom") String shippedFrom,
                                                 @RequestParam("shippedTo") String shippedTo) {

        String shipmentMode = service.getShipmentMode(shippedFrom, shippedTo);
        return ResponseEntity.ok(shipmentMode);
    }
}
