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
						image: "img/ionic.png",
						answers: [
							{ answerId: 1, answer: "Oslo" },
							{ answerId: 2, answer: "Bergen" },
							{ answerId: 3, answer: "Stavanger" },
							{ answerId: 4, answer: "Haugesund" }
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
