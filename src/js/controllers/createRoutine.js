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
            if($rootScope.userType === 0){
                $rootScope.getUser();
                $rootScope.getRoutines();
                $rootScope.getCalendar();
                $location.path("/rutinas");
            } else{
                $rootScope.creating = false;
                $rootScope.getStudent();
                $rootScope.getStudentRoutines();
            }
        }

        $scope.createRoutine = function createRoutine() {
            var newRoutine = new Rutina($scope.routine.nombre, $scope.routineExercises);
            if($rootScope.userType === 0)
                newRoutine.dates = $scope.routine.dates;
                newRoutine.dia = $scope.routine.dia;
            var index = $rootScope.userType==0? $routeParams.id: $rootScope.routineIndex;
            if($rootScope.isEditing){
                if($rootScope.userType === 0)
                    $rootScope.user.modificarRutina(newRoutine, index);
                else
                    $rootScope.user.modificarRutina(newRoutine, index, $scope.studentRoutines);
            } else{
                if($rootScope.userType === 0)
                    $rootScope.user.crearRutina(newRoutine);
                else
                    $rootScope.user.crearRutina(newRoutine, $scope.studentRoutines);
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

        $scope.setDate = function setDate(date){
            date = moment(date).format('ll');
            if(!$scope.routine.dates.includes(date))
                $scope.routine.dates.push(date);
        }

        var getDates = function getDates(){
            $scope.routine.dates = [];
            var ref = firebase.database().ref('alumnos/' + $rootScope.userId + '/fechas/' + $routeParams.id);
            var data = $firebaseObject(ref);
            data.$loaded().then(function () {
                angular.forEach(data, function (value, key) {
                    //$scope.routine.dates.push(new Date(value));
                    $scope.routine.dates.push(moment(value).format('ll'));
                });
            });
        }

        $scope.setWeekday = function setWeekday(day){
            $scope.routine.dia = day;
        }

        var init = function init() {
            $rootScope.getUser();
            $rootScope.getRoutines();
            $rootScope.getCalendar();
            $scope.muscles = [];
            $scope.exercises = [];
            $scope.mediums = [];
            $scope.routineExercises = [];
            getMuscles();
            getMediums();
            $scope.selected = false;
            $scope.routine = {nombre:undefined, dates:[]}
            $rootScope.isEditing = localStorage.getItem('isEditing');
            $scope.selectedDate = moment().format('ll');
            if($rootScope.isEditing){
                $scope.routine = JSON.parse(localStorage.getItem('currentRoutine'));

                $scope.selectedMuscle = $scope.routine.listaEjercicios[0].musculo;
                $scope.routineExercises = $scope.routine.listaEjercicios;
                $scope.routineExercises.map(function(item){
                    delete item['$$hashKey'];
                });
                $scope.getExercises($scope.selectedMuscle);

                if($rootScope.userType === 0)
                    getDates();

                if($rootScope.userType === 1)
                    $scope.routine.dates = $rootScope.student.fechas;
            }

            if($rootScope.userType === 1){
                $rootScope.getStudent();
                
                $scope.studentRoutines = JSON.parse(localStorage.getItem('currentStudentRoutines'));
            }

            $scope.weekDays = [{es: 'Lunes', en: 'Monday'},{es: 'Martes', en: 'Tuesday'},{es: 'Miércoles', en: 'Wednesday'},{es: 'Jueves', en: 'Thursday'},
            {es: 'Viernes', en: 'Friday'},{es: 'Sábado', en: 'Saturday'},{es: 'Domingo', en: 'Sunday'},]
        }

        init();
    }
]);