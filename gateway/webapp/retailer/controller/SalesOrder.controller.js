jQuery.sap.require("com.sap.espm.retailer.model.format");
sap.ui.define([
	"com/sap/espm/retailer/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	"com/sap/espm/retailer/model/formatter",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/BusyIndicator"
], function (Controller, formatter, BaseController, MessageToast, MessageBox, BusyIndicator) {
	"use strict";

	return Controller.extend("com.sap.espm.retailer.controller.SalesOrder", {

		formatter: formatter,


		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.espm.retailer.view.SalesOrder
		 */
		onInit: function () {
			var oCountry ={
				"Countries" : [
					{ "key" : "AF" ,
						"name" : "Afghanistan" },
					{ "key" : "AL" ,
						"name" : "Albania" },
					{ "key" : "DZ" ,
						"name" : "Algeria" },
					{ "key" : "UM" ,
						"name" : "American Minor Outlying Islands" },
					{ "key" : "AS" ,
						"name" : "American Samoa" },
					{ "key" : "VI" ,
						"name" : "American Virgin Islands" },
					{ "key" : "AD" ,
						"name" : "Andorra" },
					{ "key" : "AO" ,
						"name" : "Angola" },
					{ "key" : "AI" ,
						"name" : "Anguilla" },
					{ "key" : "AQ" ,
						"name" : "Antarctica" },
					{ "key" : "AG" ,
						"name" : "Antigua and Barbuda" },
					{ "key" : "AR" ,
						"name" : "Argentina" },
					{ "key" : "AM" ,
						"name" : "Armenia" },
					{ "key" : "AW" ,
						"name" : "Aruba" },
					{ "key" : "AU" ,
						"name" : "Australia" },
					{ "key" : "AT" ,
						"name" : "Austria" },
					{ "key" : "AZ" ,
						"name" : "Azerbaijan" },
					{ "key" : "BS" ,
						"name" : "Bahamas" },
					{ "key" : "BH" ,
						"name" : "Bahrain" },
					{ "key" : "BD" ,
						"name" : "Bangladesh" },
					{ "key" : "BB" ,
						"name" : "Barbados" },
					{ "key" : "BY" ,
						"name" : "Belarus" },
					{ "key" : "BE" ,
						"name" : "Belgium" },
					{ "key" : "BZ" ,
						"name" : "Belize" },
					{ "key" : "BJ" ,
						"name" : "Benin" },
					{ "key" : "BM" ,
						"name" : "Bermuda" },
					{ "key" : "BT" ,
						"name" : "Bhutan" },
					{ "key" : "BO" ,
						"name" : "Bolivia" },
					{ "key" : "BA" ,
						"name" : "Bosnia and Herzegovina" },
					{ "key" : "BW" ,
						"name" : "Botswana" },
					{ "key" : "BV" ,
						"name" : "Bouvet Islands" },
					{ "key" : "BR" ,
						"name" : "Brazil" },
					{ "key" : "IO" ,
						"name" : "British Indian Ocean Territory" },
					{ "key" : "VG" ,
						"name" : "British Virgin Islands" },
					{ "key" : "BN" ,
						"name" : "Brunei Darussalam" },
					{ "key" : "BG" ,
						"name" : "Bulgaria" },
					{ "key" : "BF" ,
						"name" : "Burkina Faso" },
					{ "key" : "MM" ,
						"name" : "Burma" },
					{ "key" : "BI" ,
						"name" : "Burundi" },
					{ "key" : "KH" ,
						"name" : "Cambodia" },
					{ "key" : "CM" ,
						"name" : "Cameroon" },
					{ "key" : "CA" ,
						"name" : "Canada" },
					{ "key" : "CV" ,
						"name" : "Cape Verde" },
					{ "key" : "KY" ,
						"name" : "Cayman Islands" },
					{ "key" : "CF" ,
						"name" : "Central African Republic" },
					{ "key" : "TD" ,
						"name" : "Chad" },
					{ "key" : "CL" ,
						"name" : "Chile" },
					{ "key" : "CN" ,
						"name" : "China" },
					{ "key" : "CX" ,
						"name" : "Christmas Islnd" },
					{ "key" : "CC" ,
						"name" : "Coconut Islands" },
					{ "key" : "CO" ,
						"name" : "Colombia" },
					{ "key" : "KM" ,
						"name" : "Comoros" },
					{ "key" : "CK" ,
						"name" : "Cook Islands" },
					{ "key" : "CR" ,
						"name" : "Costa Rica" },
					{ "key" : "CI" ,
						"name" : "Cote d'Ivoire" },
					{ "key" : "HR" ,
						"name" : "Croatia" },
					{ "key" : "CU" ,
						"name" : "Cuba" },
					{ "key" : "CY" ,
						"name" : "Cyprus" },
					{ "key" : "CZ" ,
						"name" : "Czech Republic" },
					{ "key" : "CD" ,
						"name" : "Democratic Republic of the Congo" },
					{ "key" : "DK" ,
						"name" : "Denmark" },
					{ "key" : "DJ" ,
						"name" : "Djibouti" },
					{ "key" : "DM" ,
						"name" : "Dominica" },
					{ "key" : "DO" ,
						"name" : "Dominican Republic" },
					{ "key" : "AN" ,
						"name" : "Dutch Antilles" },
					{ "key" : "TL" ,
						"name" : "East Timor" },
					{ "key" : "TP" ,
						"name" : "East Timor" },
					{ "key" : "EC" ,
						"name" : "Ecuador" },
					{ "key" : "EG" ,
						"name" : "Egypt" },
					{ "key" : "SV" ,
						"name" : "El Salvador" },
					{ "key" : "GQ" ,
						"name" : "Equatorial Guinea" },
					{ "key" : "ER" ,
						"name" : "Eritrea" },
					{ "key" : "EE" ,
						"name" : "Estonia" },
					{ "key" : "ET" ,
						"name" : "Ethiopia" },
					{ "key" : "FK" ,
						"name" : "Falkland Islands" },
					{ "key" : "FO" ,
						"name" : "Faroe Islands" },
					{ "key" : "FJ" ,
						"name" : "Fiji" },
					{ "key" : "FI" ,
						"name" : "Finland" },
					{ "key" : "FR" ,
						"name" : "France" },
					{ "key" : "GF" ,
						"name" : "French Guyana" },
					{ "key" : "PF" ,
						"name" : "French Polynesia" },
					{ "key" : "GA" ,
						"name" : "Gabon" },
					{ "key" : "GM" ,
						"name" : "Gambia" },
					{ "key" : "GE" ,
						"name" : "Georgia" },
					{ "key" : "DE" ,
						"name" : "Germany" },
					{ "key" : "GH" ,
						"name" : "Ghana" },
					{ "key" : "GI" ,
						"name" : "Gibraltar" },
					{ "key" : "GR" ,
						"name" : "Greece" },
					{ "key" : "GL" ,
						"name" : "Greenland" },
					{ "key" : "GD" ,
						"name" : "Grenada" },
					{ "key" : "GP" ,
						"name" : "Guadeloupe" },
					{ "key" : "GU" ,
						"name" : "Guam" },
					{ "key" : "GT" ,
						"name" : "Guatemala" },
					{ "key" : "GN" ,
						"name" : "Guinea" },
					{ "key" : "GW" ,
						"name" : "Guinea-Bissau" },
					{ "key" : "GY" ,
						"name" : "Guyana" },
					{ "key" : "HT" ,
						"name" : "Haiti" },
					{ "key" : "HM" ,
						"name" : "Heard and McDonald Islands" },
					{ "key" : "HN" ,
						"name" : "Honduras" },
					{ "key" : "HK" ,
						"name" : "Hong Kong" },
					{ "key" : "HU" ,
						"name" : "Hungary" },
					{ "key" : "IS" ,
						"name" : "Iceland" },
					{ "key" : "IN" ,
						"name" : "India" },
					{ "key" : "ID" ,
						"name" : "Indonesia" },
					{ "key" : "IR" ,
						"name" : "Iran" },
					{ "key" : "IQ" ,
						"name" : "Iraq" },
					{ "key" : "IE" ,
						"name" : "Ireland" },
					{ "key" : "IL" ,
						"name" : "Israel" },
					{ "key" : "IT" ,
						"name" : "Italy" },
					{ "key" : "JM" ,
						"name" : "Jamaica" },
					{ "key" : "JP" ,
						"name" : "Japan" },
					{ "key" : "JO" ,
						"name" : "Jordan" },
					{ "key" : "KZ" ,
						"name" : "Kazakhstan" },
					{ "key" : "KE" ,
						"name" : "Kenya" },
					{ "key" : "KI" ,
						"name" : "Kiribati" },
					{ "key" : "KW" ,
						"name" : "Kuwait" },
					{ "key" : "KG" ,
						"name" : "Kyrgyzstan" },
					{ "key" : "LA" ,
						"name" : "Laos" },
					{ "key" : "LV" ,
						"name" : "Latvia" },
					{ "key" : "LB" ,
						"name" : "Lebanon" },
					{ "key" : "LS" ,
						"name" : "Lesotho" },
					{ "key" : "LR" ,
						"name" : "Liberia" },
					{ "key" : "LY" ,
						"name" : "Libya" },
					{ "key" : "LI" ,
						"name" : "Liechtenstein" },
					{ "key" : "LT" ,
						"name" : "Lithuania" },
					{ "key" : "LU" ,
						"name" : "Luxembourg" },
					{ "key" : "MO" ,
						"name" : "Macau" },
					{ "key" : "MK" ,
						"name" : "Macedonia" },
					{ "key" : "MG" ,
						"name" : "Madagascar" },
					{ "key" : "MW" ,
						"name" : "Malawi" },
					{ "key" : "MY" ,
						"name" : "Malaysia" },
					{ "key" : "MV" ,
						"name" : "Maldives" },
					{ "key" : "ML" ,
						"name" : "Mali" },
					{ "key" : "MT" ,
						"name" : "Malta" },
					{ "key" : "MH" ,
						"name" : "Marshall Islands" },
					{ "key" : "MQ" ,
						"name" : "Martinique" },
					{ "key" : "MR" ,
						"name" : "Mauretania" },
					{ "key" : "MU" ,
						"name" : "Mauritius" },
					{ "key" : "YT" ,
						"name" : "Mayotte" },
					{ "key" : "MX" ,
						"name" : "Mexico" },
					{ "key" : "FM" ,
						"name" : "Micronesia" },
					{ "key" : "MD" ,
						"name" : "Moldova" },
					{ "key" : "MC" ,
						"name" : "Monaco" },
					{ "key" : "MN" ,
						"name" : "Mongolia" },
					{ "key" : "ME" ,
						"name" : "Montenegro" },
					{ "key" : "MS" ,
						"name" : "Montserrat" },
					{ "key" : "MA" ,
						"name" : "Morocco" },
					{ "key" : "MZ" ,
						"name" : "Mozambique" },
					{ "key" : "NA" ,
						"name" : "Namibia" },
					{ "key" : "NR" ,
						"name" : "Nauru" },
					{ "key" : "NP" ,
						"name" : "Nepal" },
					{ "key" : "NL" ,
						"name" : "Netherlands" },
					{ "key" : "NC" ,
						"name" : "New Caledonia" },
					{ "key" : "NZ" ,
						"name" : "New Zealand" },
					{ "key" : "NI" ,
						"name" : "Nicaragua" },
					{ "key" : "NE" ,
						"name" : "Niger" },
					{ "key" : "NG" ,
						"name" : "Nigeria" },
					{ "key" : "NU" ,
						"name" : "Niue" },
					{ "key" : "NF" ,
						"name" : "Norfolk Islands" },
					{ "key" : "KP" ,
						"name" : "North Korea" },
					{ "key" : "MP" ,
						"name" : "North Mariana Islands" },
					{ "key" : "NO" ,
						"name" : "Norway" },
					{ "key" : "OM" ,
						"name" : "Oman" },
					{ "key" : "PK" ,
						"name" : "Pakistan" },
					{ "key" : "PW" ,
						"name" : "Palau" },
					{ "key" : "PS" ,
						"name" : "Palestine" },
					{ "key" : "PA" ,
						"name" : "Panama" },
					{ "key" : "PG" ,
						"name" : "Papua New Guinea" },
					{ "key" : "PY" ,
						"name" : "Paraguay" },
					{ "key" : "PE" ,
						"name" : "Peru" },
					{ "key" : "PH" ,
						"name" : "Philippines" },
					{ "key" : "PN" ,
						"name" : "Pitcairn Islands" },
					{ "key" : "PL" ,
						"name" : "Poland" },
					{ "key" : "PT" ,
						"name" : "Portugal" },
					{ "key" : "PR" ,
						"name" : "Puerto Rico" },
					{ "key" : "QA" ,
						"name" : "Qatar" },
					{ "key" : "CG" ,
						"name" : "Republic of the Congo" },
					{ "key" : "RE" ,
						"name" : "Reunion" },
					{ "key" : "RO" ,
						"name" : "Romania" },
					{ "key" : "RU" ,
						"name" : "Russian Federation" },
					{ "key" : "RW" ,
						"name" : "Rwanda" },
					{ "key" : "SH" ,
						"name" : "Saint Helena" },
					{ "key" : "KN" ,
						"name" : "Saint Kitts and Nevis" },
					{ "key" : "WS" ,
						"name" : "Samoa" },
					{ "key" : "SM" ,
						"name" : "San Marino" },
					{ "key" : "ST" ,
						"name" : "Sao Tome and Principe" },
					{ "key" : "SA" ,
						"name" : "Saudi Arabia" },
					{ "key" : "SN" ,
						"name" : "Senegal" },
					{ "key" : "RS" ,
						"name" : "Serbia" },
					{ "key" : "CS" ,
						"name" : "Serbia and Montenegro" },
					{ "key" : "SC" ,
						"name" : "Seychelles" },
					{ "key" : "SL" ,
						"name" : "Sierra Leone" },
					{ "key" : "SG" ,
						"name" : "Singapore" },
					{ "key" : "SK" ,
						"name" : "Slovakia" },
					{ "key" : "SI" ,
						"name" : "Slovenia" },
					{ "key" : "SB" ,
						"name" : "Solomon Islands" },
					{ "key" : "SO" ,
						"name" : "Somalia" },
					{ "key" : "ZA" ,
						"name" : "South Africa" },
					{ "key" : "GS" ,
						"name" : "South Georgia and the Southern Sandwich Islands" },
					{ "key" : "KR" ,
						"name" : "South Korea" },
					{ "key" : "ES" ,
						"name" : "Spain" },
					{ "key" : "LK" ,
						"name" : "Sri Lanka" },
					{ "key" : "LC" ,
						"name" : "St. Lucia" },
					{ "key" : "PM" ,
						"name" : "St. Pierre and Miquelon" },
					{ "key" : "VC" ,
						"name" : "St. Vincent and the Grenadines" },
					{ "key" : "SD" ,
						"name" : "Sudan" },
					{ "key" : "SR" ,
						"name" : "Suriname" },
					{ "key" : "SJ" ,
						"name" : "Svalbard" },
					{ "key" : "SZ" ,
						"name" : "Swaziland" },
					{ "key" : "SE" ,
						"name" : "Sweden" },
					{ "key" : "CH" ,
						"name" : "Switzerland" },
					{ "key" : "SY" ,
						"name" : "Syria" },
					{ "key" : "TW" ,
						"name" : "Taiwan" },
					{ "key" : "TJ" ,
						"name" : "Tajikistan" },
					{ "key" : "TZ" ,
						"name" : "Tanzania" },
					{ "key" : "TH" ,
						"name" : "Thailand" },
					{ "key" : "TG" ,
						"name" : "Togo" },
					{ "key" : "TK" ,
						"name" : "Tokelau Islands" },
					{ "key" : "TO" ,
						"name" : "Tonga" },
					{ "key" : "TT" ,
						"name" : "Trinidad and Tobago" },
					{ "key" : "TN" ,
						"name" : "Tunisia" },
					{ "key" : "TR" ,
						"name" : "Turkey" },
					{ "key" : "TM" ,
						"name" : "Turkmenistan" },
					{ "key" : "TC" ,
						"name" : "Turks and Caicos Islands" },
					{ "key" : "TV" ,
						"name" : "Tuvalu" },
					{ "key" : "US" ,
						"name" : "USA" },
					{ "key" : "UG" ,
						"name" : "Uganda" },
					{ "key" : "UA" ,
						"name" : "Ukraine" },
					{ "key" : "AE" ,
						"name" : "United Arab Emirates" },
					{ "key" : "GB" ,
						"name" : "United Kingdom" },
					{ "key" : "UY" ,
						"name" : "Uruguay" },
					{ "key" : "UZ" ,
						"name" : "Uzbekistan" },
					{ "key" : "VU" ,
						"name" : "Vanuatu" },
					{ "key" : "VA" ,
						"name" : "Vatican City" },
					{ "key" : "VE" ,
						"name" : "Venezuela" },
					{ "key" : "VN" ,
						"name" : "Vietnam" },
					{ "key" : "WF" ,
						"name" : "Wallis and Futuna Islands" },
					{ "key" : "EH" ,
						"name" : "West Sahara" },
					{ "key" : "YE" ,
						"name" : "Yemen" },
					{ "key" : "ZM" ,
						"name" : "Zambia" },
					{ "key" : "ZW" ,
						"name" : "Zimbabwe" }
				] };
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel(oCountry);
			oModel.setSizeLimit(1000);
			this.getView().setModel(oModel, "oModel");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.espm.retailer.view.SalesOrder
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.espm.retailer.view.SalesOrder
		 */
		onAfterRendering: function () {

		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.espm.retailer.view.SalesOrder
		 */
		//	onExit: function() {
		//
		//	}

		listUpdateFinished: function () {

			this.getView().byId("detailPageId").setVisible(false);
		},

		handleListItemPress: function (event) {

			this.getView().byId("detailPageId").setVisible(true);

			var context = event.getSource().getBindingContextPath();
			var salesModel = new sap.ui.model.json.JSONModel(this.getView().getModel("espmRetailerModel").getProperty(context));
			this.byId("detailPageId").setModel(salesModel, "sales");
			var oCustomerModel = this.getView().getModel('espmRetailerModel');
			var customerEmail = oCustomerModel.getProperty(context + '/customerEmail');
			oCustomerModel.loadCustomer(customerEmail);
			var customer = oCustomerModel.getProperty('/customer');
			this.getView().byId("customerForm").bindElement('customer>/customer');

			if (this.getView().getModel("device").oData.isPhone) {
				this.byId("splitContId").to(this.byId("detailPageId"));
			}

		},

		handleSearch: function (evt) { // create model filter

			var filters = [];
			var query = evt.getParameter("query");
			var model = this.getView().byId("masterPageId").getModel("espmRetailerModel");
			var lifecyclestatus = model.oData.salesorders.data;
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("lifecycleStatusName", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			} // update list binding
			var list = this.getView().byId("list");
			var binding = list.getBinding("items");
			binding.filter(filters);

		},
		handleApprove: function (event) {
			var model = this.getView().byId("detailPageId").getModel("sales")
			var salesOrderId = model.oData.salesOrderId;
			var lifecyclestatus = model.oData.lifecycleStatus;
			var shippedTo = this.getView().byId("detailPageId").getModel("espmRetailerModel").oData.customer.country;
			var shippedFrom = this.getView().byId("countryListId").getSelectedItem().getKey();
			var bundle = this.getView().getModel("i18n").getResourceBundle();
			var objectAttributes = this.getView().byId("detailObjectStatus");
			var lifecycleStatusName = model.oData.lifecycleStatusName;
			var that = this;
			var val = 0;
			if (lifecyclestatus == 'N' && lifecycleStatusName == "New") {
				MessageBox.confirm(bundle.getText("sales.approveDialogMsg"),
					function (oAction) {
						if (MessageBox.Action.OK === oAction) {
							var oCustomerModel = that.getView().byId("detailPageId").getModel("espmRetailerModel");

							oCustomerModel.updateSalesOrder(salesOrderId, "S", "Sales order Shipped", shippedFrom, shippedTo)
								.then(function (status) {
									BusyIndicator.hide();
									console.log(status);
									that.getView().byId("detailPageId").setVisible(true);
									if (status.statusCode === 200) {
										MessageToast.show("Sales Order Shipped Successfully");

									}
									else {

										MessageToast.show("Product is Out of Stock");

									}
								})
								.fail(function (error) {
									BusyIndicator.hide();
									MessageToast.show("Product URL is wrong");
								});
						}
					},
					bundle.getText("sales.approveDialogTitle"));
			} else if (lifecyclestatus == 'R' || lifecyclestatus == 'C') {
				MessageToast.show("Rejected Sales Order cannot be shipped");
			} else {
				MessageToast.show("Only new Sales Order can be shipped");
			}

		},

		handleReject: function () {
			var model = this.getView().byId("detailPageId").getModel("sales")
			var salesOrderId = model.oData.salesOrderId;
			var lifecyclestatus = model.oData.lifecycleStatus;
			var bundle = this.getView().getModel("i18n").getResourceBundle();
			var objectAttributes = this.getView().byId("detailObjectStatus");

			var lifecycleStatusName = model.oData.lifecycleStatusName;
			var that = this;
			if (lifecyclestatus == 'N' && lifecycleStatusName == "New") {
				MessageBox.confirm(bundle.getText("sales.rejectDialogMsg"),
					function (oAction) {
						if (MessageBox.Action.OK === oAction) {
							var oCustomerModel = that.getView().byId("detailPageId").getModel("espmRetailerModel");
							oCustomerModel.updateSalesOrder(salesOrderId, "R", "Sales order Rejected by Retailer", "","")
								.then(function () {
									BusyIndicator.hide();
									that.getView().byId("detailPageId").setVisible(true);
									var objectAttributes = that.getView().byId("detailObjectStatus");
									objectAttributes.setText("Rejected by Retailer");
									MessageToast.show(bundle.getText("sales.rejectDialogSuccessMsg"));
								})
								.fail(function (error) {
									BusyIndicator.hide();
									MessageToast.show(bundle.getText("sales.rejectFailed"));
								});
						}
					},
					bundle.getText("sales.rejectDialogTitle"));
			} else if (lifecyclestatus == 'S') {
				MessageToast.show("Shipped Sales Order cannot be rejected");
			} else {
				MessageToast.show("Only new Sales Order can be rejected");
			}
		},

		onNavBack: function () {
			window.history.go(-1);
		},

		handleNavButtonPress: function () {
			var oSplitCont = this.byId("splitContId");
			var oMaster = oSplitCont.getMasterPages()[0];
			oSplitCont.toMaster(oMaster);
		}


	});

});