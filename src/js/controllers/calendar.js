angular.module('gymApp').controller('CalendarCtrl', ['$scope', '$location', '$mdDialog', '$filter', '$rootScope',
    function ($scope, $location, $mdDialog, $filter, $rootScope) {
        $scope.changeDate = function changeDate(date){
            $scope.indices = [];
            $scope.currentRoutines = [];
            $scope.currentDate= moment(date).format('ll');
            $scope.routineDate = date;
            var date = date;
            hasRoutines();
            if($scope.hasroutines){
                for (var property in $rootScope.user.calendario.dias[date]) {
                    if ($rootScope.user.calendario.dias[date].hasOwnProperty(property)) {
                        $rootScope.user.rutinas[property].terminado = $rootScope.user.calendario.dias[date][property];
                        $scope.currentRoutines.push($rootScope.user.rutinas[property]);
                        $scope.indices.push(property);
                    }
                }
            }
        }

        $scope.finishRoutine = function finishRoutine(routine, index){
            var i = $scope.indices[index];
           $rootScope.user.calendario.dias[$scope.routineDate][i] = true;
           $rootScope.user.terminarRutina($scope.routineDate, i, routine.terminado);
        }

        var hasRoutines = function hasRoutines(){
            if($rootScope.user.calendario.dias[$scope.routineDate]){
                $scope.hasroutines = true;
            } else{
                $scope.hasroutines = false;
            }
        }


        var init = function init(){
            $scope.currentRoutines = [];
            if(!$rootScope.user){
                $rootScope.getUser();
                $rootScope.getRoutines();
                $rootScope.getCalendar();
            } 
            $rootScope.user.calendario.dias = JSON.parse(localStorage.getItem('dates'));
            $scope.currentDate = moment().format('ll');
            $scope.routineDate = new Date();
            $scope.indices = [];
        }

        init();

    }
]);