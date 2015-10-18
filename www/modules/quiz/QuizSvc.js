'use strict';

angular.module('quizApp.quiz')

.factory("QuizSvc", function($http, $log, $q, $window, SettingsSvc) {
	var service = {},
		apiUrl = SettingsSvc.getApiUrl(),
		fileApiUrl = SettingsSvc.getFileApiUrl();

	function validateResponse(data){
		return !(typeof data != 'array' && typeof data != 'object');
	}

	service.getQuizes = function(){
		var deferred = $q.defer();

		$http.get(apiUrl + 'data/get/agreements')
			.success(function(data){
				return !validateResponse(data) ? deferred.reject(new Error('Invalid Response')) : deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject('There was an error');
			});

		return deferred.promise;
	}

	service.getQuize = function(agreementId){
		var deferred = $q.defer();

		$http.get(apiUrl + 'data/get/agreement/' + agreementId )
			.success(function(data){
				deferred.resolve(data.agreement[0]);
			})
			.error(function(data){
				deferred.reject('There was an error');
			});

		return deferred.promise;
	}
/*
	service.createAgreement = function(agreement){
		var deferred = $q.defer();

		$http({
				method: "PUT",
				url: apiUrl + 'data/put/agreement/' + agreement.PropertyID,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: agreement
			})
			.success(function(data){
				deferred.resolve(data.agreement[0]);
			})
			.error(function(data){
				deferred.reject('There was an error');
			});

		return deferred.promise;
	}

	service.uploadAgreement = function(agreementID, fileName, fileUrl){ //needed for create new receipt...
		var deferred = $q.defer(),
		options = new FileUploadOptions(),
		params = {};

        options.fileName = fileName;
		options.fileKey = options.fileName; //"powst.png"; // bruker vi denne til filename??

		params.TypeContainer = 0;
        options.params = params;
		options.headers = {"Authorization-Token": SettingsSvc.getUserToken()};

		var ft = new FileTransfer();
        ft.upload(fileUrl, encodeURI(fileApiUrl + "/postfile/agreement/" + agreementID),
            function(r){	
            	deferred.resolve(r);
			},
            function(error){
                deferred.reject(error);
            }, options);

		return deferred.promise;
	}

	service.saveAgreement = function(agreement){
		var deferred = $q.defer();

		$http({
				method: "PUT",
				url: apiUrl + 'data/put/agreement/' + agreement.PropertyID,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: agreement
			})
			.success(function(data){
				deferred.resolve(data.agreement[0]);
			})
			.error(function(data){
				deferred.reject('There was an error');
			});

		return deferred.promise;
	}

	service.deleteAgreement = function(agreement){
		var deferred = $q.defer();

		$http({
				method: "DELETE",
				url: apiUrl + 'data/delete/agreement/' + agreement.AgreementID,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: { "agreementid": agreement.AgreementID }
			})
			.success(function(data){
				deferred.resolve();
			})
			.error(function(data){
				deferred.reject('There was an error');
			});

		return deferred.promise;
	}

	service.getCategories = function(){
		var deferred = $q.defer();

		$http({
				method: "POST",
				url: apiUrl + 'data/action/receipts/GetExpenceCategories/0',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: { SearchString: "" } 
			})
			.success(function(data){
				deferred.resolve(data.receipts);
			})
			.error(function(data){
				deferred.reject('There was an error');
			});

		return deferred.promise;
	}
*/
	return service;
});