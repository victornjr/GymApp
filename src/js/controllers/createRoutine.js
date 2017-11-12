angular.module('gymApp').controller('CreateRoutineCtrl', ['$scope', '$location', '$firebaseObject', '$rootScope','$routeParams',
    function ($scope, $location, $firebaseObject, $rootScope, $routeParams) {


        /**
         * Disable button when unfinished form
         * ícono para agregar comentarios
         * Confirmación para cancelar y para crear
         * Agregar opción de cardio y tiempo
         * Opción para agregarla directamente al calendario
         */
        $scope.cancel = function cancel() {
            $location.path("/rutinas");
        }

        $scope.createRoutine = function createRoutine() {
            var newRoutine = new Rutina($scope.routine.nombre, $scope.routineExercises);
            var index = $routeParams.id;
            if($rootScope.isEditing){
                $rootScope.user.modificarRutina(newRoutine, index);
            } else{
                $rootScope.user.crearRutina(newRoutine);
            }
            $scope.cancel();
        }

        var getMuscles = function getMuscles() {
            var ref = firebase.database().ref('ejercicios');
            var data = $firebaseObject(ref);
            data.$loaded().then(function () {
                angular.forEach(data, function (value, key) {
                    $scope.muscles.push(key.charAt(0).toUpperCase() + key.slice(1));
                });

            });
        }

        $scope.getExercises = function getExercises(muscle) {
            $scope.exercises = [];
            $scope.selectedMuscle = muscle;
            var ref = firebase.database().ref('ejercicios/' + muscle.toLowerCase());
            var data = $firebaseObject(ref);
            data.$loaded().then(function () {
                angular.forEach(data, function (value, key) {
                    key = key.charAt(0).toUpperCase() + key.slice(1);
                    var index = $scope.routineExercises.find(function(item){
                        return key == item.nombre;
                    });
                    var object = index? index:new Ejercicio(key, muscle);
                    object.medium = value;
                    $scope.exercises.push(object);
                });
            });
        }

        var getMediums = function getMediums() {
            var ref = firebase.database().ref('medio');
            var data = $firebaseObject(ref);
            data.$loaded().then(function () {
                angular.forEach(data, function (value, key) {
                    value = value.charAt(0).toUpperCase() + value.slice(1);
                    $scope.mediums.push(value);
                });
            });
        }

        $scope.addExercise = function addExercise(exercise) {
            if (exercise.selected) {
                $scope.routineExercises.push(exercise);
                exercise.index = $scope.routineExercises.length - 1;
            } else {
                var index = exercise.index;
                $scope.routineExercises.splice(index, 1);
            }
        }

        $scope.setMedium = function setMedium(exercise, type) {
            if (exercise.medio) {
                var newmedium = type ? $scope.mediums[medium] : medium;
                $scope.routineExercises[exercise.index].medio = newmedium;
            }
        }

        var init = function init() {
            if(!$rootScope.user){
                $rootScope.getUser();
                $rootScope.getRoutines();
            }
            $scope.muscles = [];
            $scope.exercises = [];
            $scope.mediums = [];
            $scope.routineExercises = [];
            getMuscles();
            getMediums();
            $scope.selected = false;
            $scope.routine = {nombre:undefined}
            $rootScope.isEditing = localStorage.getItem('isEditing');
            if($rootScope.isEditing){
                $scope.routine = JSON.parse(localStorage.getItem('currentRoutine'));
                $scope.selectedMuscle = $scope.routine.listaEjercicios[0].musculo;
                $scope.routineExercises = $scope.routine.listaEjercicios;
                $scope.routineExercises.map(function(item){
                    delete item['$$hashKey'];
                })
                $scope.getExercises($scope.selectedMuscle);
            }
        }

        init();
    }
]);