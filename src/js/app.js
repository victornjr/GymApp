angular.module('gymApp', [
    'ngRoute','ngMaterial'
])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/inicio', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            }) 
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/rutinas', {
                templateUrl: 'views/routines.html',
                controller: 'RoutinesCtrl'
            })
            .when('/rutinas/crear',{
                templateUrl: 'views/createRoutine.html',
                controller: 'CreateRoutineCtrl'
            })
            .when('/rutinas/modificar/:id',{
                templateUrl: 'views/createRoutine.html',
                controller: 'CreateRoutineCtrl'
            })
            .when('/calendario',{
                templateUrl: 'views/calendar.html',
                controller: 'CalendarCtrl'
            })
            .when('/cuestionario',{
                templateUrl: 'views/questionnaire.html',
                controller: 'QuestionnaireCtrl'
            });
    }
]);
