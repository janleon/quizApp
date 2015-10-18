angular.module('quizApp.settings', []);
angular.module('quizApp.quiz', []);

angular.module('quizApp', [
    'ionic',
    'ngCordova',
    'quizApp.settings',
    'quizApp.quiz'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

    .state('app.quiz', {
        url: "/quiz",
        views: {
            'menuContent': {
                templateUrl: "modules/quiz/templates/quiz.html",
                controller: 'QuizCtrl as quizCtrl',
            }
        }
    })

    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "modules/settings/templates/settings.html",
                controller: 'SettingsCtrl as settingsCtrl',
            }
        }
    });

    $urlRouterProvider.otherwise('/app/quiz');
});
