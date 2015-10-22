'use strict';

angular.module('quizApp.quiz')

.controller('QuizzesCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicModal',
    '$log',
    '$ionicPopup',
    'SystemSvc',
    'QuizSvc',
    function($scope, $state, $stateParams, $ionicLoading, $ionicModal, $log, $ionicPopup, SystemSvc, QuizSvc) {
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

        ctrl.getQuizzes = function(showLoading) {
            resetErrorMessage();

            if (showLoading) {
                $ionicLoading.show({
                    content: 'Loading...',
                    showBackdrop: false
                });
            }

            QuizSvc.getQuizzes()
                .then(function(data) {
                    ctrl.quizzes = data.quizzes;
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
            ctrl.getQuizzes(true);
        }

        initialize();

        return ctrl;
    }
]);
