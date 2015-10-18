'use strict';

angular.module('quizApp.settings')

.factory("SettingsSvc", [
	function() {
	    var service = {};

	    service.getApiUrl = function(){
	    	return "";
	    }

	    return service;
	}
]);
