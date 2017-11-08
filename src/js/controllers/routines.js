angular.module('gymApp').controller('RoutinesCtrl', ['$scope', '$location', '$mdDialog',
    function ($scope, $location, $mdDialog) {
        $scope.items = [0, 0, 0, 0, 0, 0, 0];

        $scope.routineDetails = function routineDetails() {
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
            //localStorage.setItem('current', JSON.stringify(collaborator));
            var nombre = "Rutinax"
            $location.path('rutinas/modificar/' + nombre);
        }
    }
]);