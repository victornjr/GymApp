angular.module('gymApp', ['ngRoute', 'ngMaterial', 'firebase']).config([
    '$routeProvider',
    function ($routeProvider) {
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
            .when('/rutinas/crear', {
                templateUrl: 'views/createRoutine.html',
                controller: 'CreateRoutineCtrl'
            })
            .when('/rutinas/modificar/:id/:name', {
                templateUrl: 'views/createRoutine.html',
                controller: 'CreateRoutineCtrl'
            })
            .when('/cardio', {
                templateUrl: 'views/cardio.html',
                controller: 'CardioCtrl'
            })
            .when('/calendario', {
                templateUrl: 'views/calendar.html',
                controller: 'CalendarCtrl'
            })
            .when('/alumnos', {
                templateUrl: 'views/students.html',
                controller: 'StudentsCtrl'
            })
            .when('/alumnos/:id/:name', {
                templateUrl: 'views/studentDetails.html',
                controller: 'StudentDetailsCtrl'
            })
            .when('/cuestionario', {
                templateUrl: 'views/questionnaire.html',
                controller: 'QuestionnaireCtrl'
            });
    }
]).run(['$rootScope', '$location', '$firebaseObject', '$routeParams',function ($rootScope, $location, $firebaseObject,$routeParams) {

    $rootScope.getUser = function getUser() {
        var user = JSON.parse(localStorage.getItem('user'));
        //Validar tipo usuario
        $rootScope.userId = localStorage.getItem('userId');
        var userType = localStorage.getItem('userType');
        if (userType == 'alumnos') {
            $rootScope.userType = 0;
            $rootScope.user = new Alumno(user.nombre, user.correo, user.contrasena);
        } else {
            $rootScope.userType = 1;
            $rootScope.user = new Entrenador(user.nombre, user.correo, user.contrasena);
        }
        //$rootScope.getCalendar();
    }

    $rootScope.getRoutines = function getRoutines() {
        var ref = firebase.database().ref('alumnos/' + $rootScope.userId + '/rutinas');
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                $rootScope.user.rutinas.push(value);
            });
            localStorage.setItem('currentRoutines',JSON.stringify($rootScope.user.rutinas));
            localStorage.setItem('user', JSON.stringify($rootScope.user));
        });
    }

    $rootScope.getCardio = function getCardio() {
        var ref = firebase.database().ref('alumnos/' + $rootScope.userId + '/cardio');
        var data = $firebaseObject(ref);
        $rootScope.user.cardio = [];
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                $rootScope.user.cardio.push(value);
            });
            localStorage.setItem('currentCardio',JSON.stringify($rootScope.user.cardio));
            localStorage.setItem('user', JSON.stringify($rootScope.user));
        });
    }

    

    $rootScope.getCalendar = function getCalendar() {
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

    $rootScope.getStudents = function getStudents() {
        var ref = firebase.database().ref('entrenadores/' + $rootScope.userId + '/alumnos');
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                $rootScope.user.alumnos.push(value);
            });
            localStorage.setItem('user', JSON.stringify($rootScope.user));
        });
    }

    $rootScope.getStudent = function getStudent(id){
        var studentId = id? id: $routeParams.id;
        var ref = firebase.database().ref('alumnos/' + studentId);
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            $rootScope.student = data;
            localStorage.setItem('currentStudentRoutines',JSON.stringify($rootScope.student.rutinas));
            localStorage.setItem('currentStudentDates',JSON.stringify($rootScope.student.calendario['dias']));
        });
    }

}]);
