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

        ctrl.getQuiz = function(showLoading) {
            resetErrorMessage();

            if (showLoading) {
                $ionicLoading.show({
                    content: 'Loading...',
                    showBackdrop: false
                });
            }

            QuizSvc.getQuiz($stateParams.quizId)
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
                });
        }

        ctrl.answerQuestion = function(alternative){
            if(alternative.correct){
                $ionicLoading.show({template: '<div>Rett svar</div>'});
                playSuccessSound();
                setTimeout(function(){
                    $ionicLoading.hide();
                    moveToNextQuestion();        
                }, 2000);
            } else {
                $ionicLoading.show({template: '<div>Feil svar. Prøv igjen.</div>'});
                playErrorSound();
                setTimeout(function(){
                    $ionicLoading.hide();     
                }, 2000);
            }
        }

        function moveToNextQuestion(){
            var index  = _.findIndex(ctrl.questions, function(item) { return item.id === ctrl.currentQuestion.id });

            if(ctrl.questions.length > index+1){
                ctrl.currentQuestion = ctrl.questions[index+1];   
            } else {
                ctrl.currentQuestion = ctrl.questions[0];
            }
        }


        function playSuccessSound(){
            SystemSvc.playSound("/sounds/success.mp3");
        }
        function playErrorSound(){
            SystemSvc.playSound("/sounds/error.mp3");
        }
        
        function initialize() {
            ctrl.getQuiz(true);
        }

        initialize();

        return ctrl;
    }
]);
