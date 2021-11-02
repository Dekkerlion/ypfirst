sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("YpFirst.controller.detailsView", {
		getGlobal: function(property_name) {
			return this.settingsModel.getProperty("/" + property_name);
		},

		setGlobal: function(property_name, newValue) {
			return this.settingsModel.setProperty("/" + property_name, newValue);
		},
		onInit: function() {
			this.oModel = this.getOwnerComponent().getModel();
		}

	});
});