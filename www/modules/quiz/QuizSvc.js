'use strict';

angular.module('quizApp.quiz')

.factory("QuizSvc", [
	'$http',
	'$log',
	'$q',
	'SettingsSvc',
	function($http, $log, $q, SettingsSvc) {
	    var service = {},
	    	apiUrl = SettingsSvc.getApiUrl();

	    function validateResponse(data){
			return !(typeof data != 'array' && typeof data != 'object');
		}

	    service.getQuiz = function(){
			var deferred = $q.defer();

			deferred.resolve({ 
				questions:[
					{
						questionId: 1,
						question: "Hva heter hovedstaden i Norge?",
						duration: 5000,
						category: "Hovedsteder",
						image: "img/ionic.png",
						alternatives: [
							{ alternative: 1, alternative: "Oslo" },
							{ alternativeId: 2, alternative: "Bergen" },
							{ alternativeId: 3, alternative: "Stavanger" },
							{ alternativeId: 4, alternative: "Haugesund" }
						]
					},
					{ question: "Question 2" },
					{ question: "Question 3" },
					{ question: "Question 4" },
					{ question: "Question 5" }
				]
			});
			/*$http.get(apiUrl + 'data/get/quiz')
				.success(function(data){
					return !validateResponse(data) ? deferred.reject(new Error('Invalid Response')) : deferred.resolve(data);
				})
				.error(function(error){
					deferred.reject(error);
				});*/

			return deferred.promise;
		}

	    return service;
	}
]);
