'use strict';

angular.module('quizApp.quiz')

.controller('QuizItemCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicModal',
    '$cordovaCamera',
    '$log',
    '$ionicPopup',
    'QuizSvc',
    function($scope, $state, $stateParams, $ionicLoading, $ionicModal, $cordovaCamera, $log, $ionicPopup, QuizSvc) {
        var ctrl = this;

        ctrl.getQuiz = function(showLoading) {

            if (showLoading) {
                $ionicLoading.show({
                    content: 'Loading...',
                    showBackdrop: false
                });
            }

            QuizSvc.getQuiz()
                .then(function(data) {
                    var quiz = data.quiz;

                    ctrl.quiz = quiz;

                    if (showLoading) {
                        $ionicLoading.hide();
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error) {
                    ctrl.error = true;
                    if (showLoading) {
                        $ionicLoading.hide();
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        ctrl.getQuiz(true);
    }
]);