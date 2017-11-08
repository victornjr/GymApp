angular.module('gymApp')
    .controller('CreateRoutineCtrl', [
        '$scope', '$location',
        function ($scope, $location) {

            $scope.muscles = ["Pierna", "Pecho", "Bícep", "Trícep", "Hombro", "Espalda", "Glúteo"];
            $scope.exercises = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            $scope.selected = false;
            $scope.routine = { name: "", comments: "" }

            $scope.cancel = function cancel() {
                $location.path("/rutinas");
            }

            $scope.createRoutine = function createRoutine() {
                //API CALL
            }

            

        }
    ]);