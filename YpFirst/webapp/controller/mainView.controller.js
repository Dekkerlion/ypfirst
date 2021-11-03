sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("YpFirst.controller.mainView", {

		getGlobal: function(property_name) {
			return this.settingsModel.getProperty("/" + property_name);
		},

		setGlobal: function(property_name, newValue) {
			return this.settingsModel.setProperty("/" + property_name, newValue);
		},
		
		onInit : function() {
			this.mainModel = this.getOwnerComponent().getModel();
			this.onReadPress();
			this.mainModel.setUseBatch(false);
		},
		
		// The "R" in CRUD
		onReadPress: function(oEvent) {

			var _this = this;

			// var allFilters = [];
			// var filter1 = new Filter({
			// 	path: "Id",
			// 	operator: FilterOperator.EQ,
			// 	value1: "80"
			// });
			// allFilters.push(filter1);

			this.mainModel.read("/MaterialsSet", {
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

		},
		
		onCreatePress: function(oEvent) {

			var oEntry = {
				"Matnr": "asds",
				"Maktx": "amd",
				"Mtart": "3",
				"Ntgew": "1.3",
				"Brgew": "3",
				"Gewei": "kg",
				"Volum": "34",
				"Voleh": "kg",
				"CreatedAt": new Date(),
				"CreatedBy": "andvoicu",
				"ChangedAt": new Date(),
				"ChangedBy": "andvoicu"
			};
			
			this.mainModel.create("/MaterialsSet", oEntry, {
				method: "POST",
				success: function(executionResult) {
					alert("Created!");
				},
				error: function(callError) {
					alert(callError.message + "\n" + callError.responseText);
				}
			});

		}
	});
});