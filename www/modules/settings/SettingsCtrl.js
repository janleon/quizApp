'use strict';

angular.module('quizApp.settings')

.controller('SettingsCtrl', [
    '$scope',
    '$rootScope',
    '$ionicHistory',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicPopup',
    '$window',
    '$location',
    '$log',
    '$cordovaInAppBrowser',
    '$http',
    '$ionicModal',
    'SettingsSvc',
    function($scope, $rootScope, $ionicHistory, $state, $stateParams, $ionicLoading, $ionicPopup, $window, $location, $log, $cordovaInAppBrowser, $http, $ionicModal, SettingsSvc) {
        var ctrl = this;

        ctrl.saveSettings = function() {

        }
    }
]);
