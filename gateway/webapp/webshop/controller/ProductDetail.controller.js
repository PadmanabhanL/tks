sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "com/sap/espm/shop/model/Formatter",
      "sap/ui/core/UIComponent",
      "sap/ui/model/json/JSONModel",
      "sap/ui/core/routing/History",
      "sap/ui/core/Fragment"
    ],
    function (Controller, formatter, UIComponent, JSONModel, History, Fragment) {
      "use strict";
      var bindingObject, bindingPath, productId, customerName;
      return Controller.extend("com.sap.espm.shop.controller.ProductDetail", {
        formatter: formatter,
        sortReviewDesc: true,
        onInit: function () {
          var that = this;
          var oComponent = this.getOwnerComponent();
          var oModel = oComponent.getModel("Cart");
          this.getView().addEventDelegate({
            onAfterShow: function () {
              that
                  .getView()
                  .byId("btnProductHeader")
                  .setText(formatter.onAddCountToCart(oModel));
            },
          });

          this.getView().setModel(new JSONModel(), "reviewsModel");
          var oRouter = UIComponent.getRouterFor(this);
          oRouter
              .getRoute("ProductDetail")
              .attachPatternMatched(this._onObjectMatched, this);

          this._oReviewDialog = null;
        },
        _onObjectMatched: function (oEvent) {
          bindingObject = oEvent.getParameter("arguments").Productdetails;
          productId = this.getView().getModel("customer").getData().products.data[parseInt(bindingObject)].productId
          customerName = this.getView().getModel("customer").getData().customer.firstName +" "+ this.getView().getModel("customer").getData().customer.lastName;
          console.log("customerName",customerName);
          bindingPath = "/" + bindingObject;
          bindingObject = "customer>/products/data" + bindingPath;
          this.getView().bindElement(bindingObject);

          var that = this;

          that.getReviewsData(that);
        },

        onAfterRendering: function () {},
        onBeforeRendering: function () {},
        onNavBack: function () {
          var oHistory = History.getInstance();
          var sPreviousHash = oHistory.getPreviousHash();

          if (sPreviousHash !== undefined) {
            window.history.go(-1);
          } else {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("Home", true);
          }
        },

        onAddToCartPressed: function () {
          var oModel = this.getView().getModel("Cart");
          var model = this.getView().getModel("customer");
          var productContext = model.getProperty("/products/data" + bindingPath);
          formatter.onAddToCart(oModel, productContext);
          this.getView()
              .byId("btnProductHeader")
              .setText(formatter.onAddCountToCart(oModel));
        },
        onShoppingCartPressed: function () {
          var oRouter = UIComponent.getRouterFor(this);
          oRouter.navTo("Shoppingcart");
        },
        _createDialog: function (sDialog) {
          var oDialog = sap.ui.xmlfragment(sDialog, this);
          jQuery.sap.syncStyleClass("sapUiSizeCompact", this._oView, oDialog);
          this.getView().addDependent(oDialog);
          return oDialog;
        },

        onTableSettingsPressed: function () {
          var oBinding = this.byId("reviewTable").getBinding("items");
          var aSorters = [];
          var aDescending = this.sortReviewDesc;
          this.sortReviewDesc = !this.sortReviewDesc;

          aSorters.push(new sap.ui.model.Sorter("Rating", aDescending));
          oBinding.sort(aSorters);
        },

        getReviewsData: function(that){
          $.ajax({
            type: "GET",
            url: `/odata/v4/ReviewService/Reviews?$filter=productId eq '${productId}'`,
            async: true,
            dataType:'json',
            success: function(data, textStatus, request) {
              console.log("inside success");
              that.getView().getModel("reviewsModel").setData(data);
              that.getView().getModel("reviewsModel").refresh(true);
            },
            error: function(error) {
              console.log("error in loading Reviews table",error);
              sap.ui.commons.MessageBox.show("Error in loading Reviews Table",
                  "ERROR",
                  "Error");
              return;
            }
          });
        },

        clearReviewDialogForm: function (oDialog) {
          oDialog.getContent()[0]._aElements[1].mProperties.value=0;
          oDialog.getContent()[0]._aElements[3].mProperties.value = "";
        },
        //This is for add review
        onAddReviewPressed: function (){
          console.log("inside add review pressed");
          var oView = this.getView();

          // create dialog lazily
          if (!this.pDialog) {
            this.pDialog = Fragment.load({
              id: oView.getId(),
              name: "com.sap.espm.shop.view.addReview",
              controller: this
            }).then(function (oDialog) {
              // connect dialog to the root view of this component (models, lifecycle)
              oView.addDependent(oDialog);
              return oDialog;
            });
          }
          this.pDialog.then(function(oDialog) {
            oDialog.open();
          });
        },

        onCloseDialog: function () {
          // note: We don't need to chain to the pDialog promise, since this event-handler
          // is only called from within the loaded dialog itself.
          //this.byId("addReview--addReview").close();
          var that=this;
          this.pDialog.then(function(oDialog) {
            that.clearReviewDialogForm(oDialog);
            oDialog.close();
          });
        },
        onAddReview: function(oEvent){
          var data = {};
          data.rating = oEvent.getSource().getParent().getContent()[0]._aElements[1].mProperties.value;
          data.comments = oEvent.getSource().getParent().getContent()[0]._aElements[3].mProperties.value;
          data.productId = productId;
          data.customerName = customerName;
          var that = this;
          jQuery.ajax({
            type: "Post",
            data: JSON.stringify(data),
            headers: {
              'Accept': "application/json",
              'Content-Type': "application/json"
            },
            url: `/odata/v4/ReviewService/Reviews`,
            success: function(){
              sap.m.MessageToast.show("review Created", {duration: 5000});
              that.getReviewsData(that);
              that.pDialog.then(function(oDialog) {
                that.clearReviewDialogForm(oDialog);
                oDialog.close();
              });
            },
            error: function(error){
              console.error(error);
              sap.m.MessageToast.show("Error Occured", {duration: 5000});
              that.pDialog.then(function(oDialog) {
                that.clearReviewDialogForm(oDialog);
                oDialog.close();
              });
            }
          });
        }
      });
    }
);