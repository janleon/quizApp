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

        function validateResponse(data) {
            return !(typeof data != 'array' && typeof data != 'object');
        }

        service.getQuiz = function() {
            var deferred = $q.defer();

            deferred.resolve({
                quiz: {
                    id: 1,
                    title: "Hovedsteder",
                    subTitle: "Hovedsteder i verden",
                    icon: "ion-ios-help-outline"
                },
                questions: [{
                    Id: 1,
                    question: "Hva heter hovedstaden i Norge? Med et spørsmål som går over flere linjer",
                    duration: 5000,
                    category: "Hovedsteder",
                    image: "img/norway.png",
                    alternatives: [{
                        id: 1,
                        alternative: "Oslo",
                        correct: true
                    }, {
                        id: 2,
                        alternative: "Bergen",
                        correct: false
                    }, {
                        id: 3,
                        alternative: "Stavanger",
                        correct: false
                    }, {
                        id: 4,
                        alternative: "Haugesund",
                        correct: false
                    }]
                }, {
                    Id: 2,
                    question: "Hva heter hovedstaden i Sverige?",
                    duration: 5000,
                    category: "Hovedsteder",
                    image: "img/sweden.png",
                    alternatives: [{
                        id: 1,
                        alternative: "Oslo",
                        correct: false
                    }, {
                        id: 2,
                        alternative: "Bergen",
                        correct: false
                    }, {
                        id: 3,
                        alternative: "Stockholm",
                        correct: true
                    }, {
                        id: 4,
                        alternative: "Haugesund",
                        correct: false
                    }]
                }]
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

        service.getQuizzes = function() {
            var deferred = $q.defer();

            deferred.resolve({
                quizzes: [{
                    id: 1,
                    title: "Hovedsteder",
                    subTitle: "Hovedsteder i verden",
                    icon: "ion-ios-help-outline"
                }, {
                    id: 2,
                    title: "Land",
                    subTitle: "Land i verden",
                    icon: "ion-ios-help-outline"
                }]
            });
            /*$http.get(apiUrl + 'data/get/quizzes')
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
