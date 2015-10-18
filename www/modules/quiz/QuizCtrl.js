'use strict';

angular.module('quizApp.quiz')

.controller('QuizCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicModal',
    '$log',
    '$ionicPopup',
    'QuizSvc',
    function($scope, $state, $stateParams, $ionicLoading, $ionicModal, $log, $ionicPopup, QuizSvc) {
        var ctrl = {
            error: false,
            errorMessage: "",
            questions: [],
            currentQuestion: null
        };

        function resetErrorMessage(){
            ctrl.error = false;
            ctrl.errorMessage = "";
        }

        ctrl.getQuiz = function(showLoading) {
            resetErrorMessage();

            if (showLoading) {
                $ionicLoading.show({
                    content: 'Loading...',
                    showBackdrop: false
                });
            }

            QuizSvc.getQuiz()
                .then(function(data) {
                    ctrl.questions = data.questions;
                    ctrl.currentQuestion = ctrl.questions[0];
                })
                .catch(function(error) {
                    ctrl.error = true;
                    ctrl.errorMessage = error;
                })
                .finally(function() {
                    if (showLoading) {
                        $ionicLoading.hide();
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function initialize() {
            ctrl.getQuiz(true);
        }

        initialize();

        return ctrl;
    }
]);
