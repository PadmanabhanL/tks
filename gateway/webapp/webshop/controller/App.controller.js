sap.ui.define([
	"com/sap/espm/shop/controller/BaseController",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/m/MessageBox"
], function (BaseController, Dialog, Button, Text, MessageBox) {
	"use strict";

	return BaseController.extend("com.sap.espm.shop.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.espm.shop.view.App
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.espm.shop.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.espm.shop.view.App
		 */
		onAfterRendering: function () {
			MessageBox.information("ESPM is a demo application. So, please do not enter any real personal information when using the application");
			// if (!this.pressDialog) {
			// 	this.pressDialog = new Dialog({
			// 		title: 'Important Information',
			// 		content: new Text({
			// 			text: "ESPM is a demo application. So, please do not enter any real personal information when using the application"
						
			// 		}),
			// 		beginButton: new Button({
			// 			text: 'Close',
			// 			press: function () {
			// 				this.pressDialog.close();
			// 			}.bind(this)
			// 		})
			// 	});

			// 	//to get access to the global model
			// 	this.getView().addDependent(this.pressDialog);
			// }

			// this.pressDialog.open();
			
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.espm.shop.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});