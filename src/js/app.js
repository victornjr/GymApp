angular.module('gymApp', [
    'ngRoute','ngMaterial','firebase'
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
            .when('/rutinas/modificar/:id/:name',{
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
]).run(['$rootScope', '$location','$firebaseObject', function ($rootScope, $location, $firebaseObject) {
    
    $rootScope.getUser = function getUser(){
        var user = JSON.parse(localStorage.getItem('user'));
        //Validar tipo usuario
        $rootScope.userId = localStorage.getItem('userId');
        $rootScope.user = new Alumno(user.nombre, user.correo, user.contrasena);
        //$rootScope.getCalendar();
    }

    $rootScope.getRoutines = function getRoutines() {
        var ref = firebase.database().ref('alumnos/' + $rootScope.userId + '/rutinas');
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                $rootScope.user.rutinas.push(value);
            });
            localStorage.setItem('user', JSON.stringify($rootScope.user));
        });
    }

    $rootScope.getCalendar = function getCalendar(){
        var ref = firebase.database().ref('alumnos/' + $rootScope.userId + '/calendario');
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                $rootScope.user.calendario.dias = value;
                localStorage.setItem('dates', JSON.stringify(value));
            });
            localStorage.setItem('user', JSON.stringify($rootScope.user));
        });
    }

  }]);
