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
            questions: []
        };

        ctrl.getQuiz = function(showLoading) {
            ctrl.error = false;

            if (showLoading) {
                $ionicLoading.show({
                    content: 'Loading...',
                    showBackdrop: false
                });
            }

            QuizSvc.getQuiz()
                .then(function(data) {
                    ctrl.questions = data.questions;
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
