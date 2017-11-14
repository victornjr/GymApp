angular.module('gymApp').controller('RoutinesCtrl', ['$scope', '$location', '$mdDialog', '$http','$rootScope','$firebaseObject', function ($scope, $location, $mdDialog, $http, $rootScope, $firebaseObject) {

    $scope.routineDetails = function routineDetails(routine, routineIndex) {
        $scope.currentIndex = routineIndex;
        $scope.selectedRoutine = routine;
        $scope.routineExercises = [];
        var index;
        var object;
        $scope.selectedRoutine.listaEjercicios.map(function(item){
            index = $scope.routineExercises.findIndex(function(exercise){
                return item.musculo === exercise.muscle;
            });
            if(index < 0){
                object = {muscle: item.musculo, exercises: [item]};
                $scope.routineExercises.push(object);
            } else{
                $scope.routineExercises[index].exercises.push(item);
            }
            
        });
        $mdDialog.show({
            contentElement: '#myDialog',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    $scope.createRoutine = function createRoutine() {
        if($rootScope.userType === 0)
            $location.path("/rutinas/crear");
    }

    $scope.modifyRoutine = function modifyRoutine() {
        localStorage.setItem('isEditing', true);
        localStorage.setItem('currentRoutine',JSON.stringify($scope.selectedRoutine));
        if($rootScope.userType === 0)
            $location.path('rutinas/modificar/' + $scope.currentIndex + "/" + $scope.selectedRoutine.nombre);
        if($rootScope.userType === 1){
            $rootScope.creating = true;
            $rootScope.routineIndex = $scope.currentIndex;
        }
    }

    $rootScope.getStudentRoutines = function getStudentRoutines(){
        $scope.routines = JSON.parse(localStorage.getItem('currentStudentRoutines'));
    }

    $scope.getRoutines = function getRoutines(){
        $scope.routines = JSON.parse(localStorage.getItem('currentRoutines'));
    }


    localStorage.removeItem('isEditing');
    $scope.routines = [];
    $rootScope.getUser();
    if($rootScope.userType === 0){
        $rootScope.getRoutines();
        $scope.getRoutines();
    } else{
        $rootScope.getStudentRoutines();
    }

}
]);