'use strict';

angular.module('quizApp.quiz')

.controller('QuizCtrl', [
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

        ctrl.getQuizes = function(showLoading) {

            if (showLoading) {
                $ionicLoading.show({
                    content: 'Loading...',
                    showBackdrop: false
                });
            }

            QuizSvc.getQuizes()
                .then(function(data) {
                    var quizes = data.quizes;

                    ctrl.quizes = quizes;

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

        ctrl.getQuizes(true);
    }
]);