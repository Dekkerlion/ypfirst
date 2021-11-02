sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function(Controller,MessageToast, Fragment, JSONModel) {
	"use strict";

	return Controller.extend("YpFirst.controller.detailsView", {

		getGlobal: function(property_name) {
			return this.settingsModel.getProperty("/" + property_name);
		},

		setGlobal: function(property_name, newValue) {
			return this.settingsModel.setProperty("/" + property_name, newValue);
		},

		onInit: function() {
			this.crudModel = this.getOwnerComponent().getModel();
			this.onReadPress();
		},

		onReadPress: function(oEvent) {
            var _this = this;
            this.crudModel.read("/StocksSet", {
                method: "GET",
                // filters: allFilters,
                success: function(responseData) {
                    var readModel = new JSONModel();
                    readModel.setData(responseData);
                    _this.getView().setModel(readModel);
                },
                error: function(callError) {
                    alert(callError.message + "\n" + callError.responseText);
                }
            });
            // var _this = this;
            // var allFilters = [];
            // var filter1 = new Filter({
            //  path: "Matnr",
            //  operator: FilterOperator.EQ,
            //  value1: "80"
            // });
            // allFilters.push(filter1);
        },
		
		 onCreatePress: function(oEvent) {
			var oEntry = {
				"Matnr": "",
				"Location": this.getView().byId("newLocation").getValue(),
				"Quantity": this.getView().byId("newQuantity").getValue(),
				"Meins": "PC"
			};

			this.crudModel.create("/StocksSet", oEntry, {
				method: "POST",
				success: function(executionResult) {
					alert("Created!");
				},
				error: function(callError) {
					alert(callError.message + "\n" + callError.responseText);
				}
			});
		},
		onOpenDialog : function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("createStock")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "YpFirst.view.createStockDialog",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("createStock").open();
			}
		},

		onCloseDialog : function () {
			this.byId("createStock").close();
		}
	});
});