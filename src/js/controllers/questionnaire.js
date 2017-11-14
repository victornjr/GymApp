angular.module('gymApp').controller('QuestionnaireCtrl', ['$scope', '$http', '$location', '$mdDialog', '$filter', '$rootScope','$firebaseObject', function ($scope, $http, $location, $mdDialog, $filter, $rootScope,$firebaseObject) {

    $scope.submit = function submit() {
        $scope.questionnaire.respuestas = $scope.answers;
        $rootScope.user.hacerCuestionario($scope.questionnaire);
        if ($scope.answers[$scope.answers.length - 1] === 'si') {
            $rootScope.user.enviarSolicitudEntrenador($scope.selectedCoach);
            //alerta de envío de respuestas y solicitud
        }
        $location.path("/inicio");
    }

    $scope.toggleAnswer = function toggleAnswer(answer, index, tofalse) {
        //Intercambiar checkbox -buscar groups-
        if($scope.answers[index] == answer){
            $scope.answers.splice(index,1);
            $scope.answered--;
        }else if(!$scope.answers[index]){
            $scope.answers[index] = answer;
            $scope.answered++;
        } else if($scope.answers[index]){
            $scope.answers[index] = answer;
        }
    }

    $scope.setCoach = function setCoach(coach){
        $scope.selectedCoach = coach;
    }

    var getCoaches = function getCoaches() {
        var ref = firebase.database().ref('entrenadores');
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                data[key].id = key;
                $scope.coaches.push(data[key]);
            });
        });
    }

    var init = function init() {
        $rootScope.getUser();
        $scope.answered = 0;
        $scope.questionnaire = new CuestionarioInicial();
        $scope.questions = $scope.questionnaire.preguntas;
        $scope.answers = [];
        $scope.coaches = [];
        var user = JSON.parse(localStorage.getItem('user'));
        //Validar tipo usuario
        $rootScope.user = new Alumno(user.nombre, user.correo, user.contrasena);
        getCoaches();
    }

    init();


}]);