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
        $location.path("/rutinas/crear");
    }

    $scope.modifyRoutine = function modifyRoutine() {
        localStorage.setItem('isEditing', true);
        localStorage.setItem('currentRoutine',JSON.stringify($scope.selectedRoutine));
        $location.path('rutinas/modificar/' + $scope.currentIndex + "/" + $scope.selectedRoutine.nombre);
    }

    var init = function init() {
        localStorage.removeItem('isEditing');
        $scope.routines = [];
        if(!$rootScope.user){
            $rootScope.getUser();
            $rootScope.getRoutines();
        } 
        $scope.routines = $rootScope.user.rutinas;
        
    }

    init();
}
]);