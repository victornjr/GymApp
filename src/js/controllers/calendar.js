angular.module('gymApp').controller('CalendarCtrl', ['$scope', '$location', '$mdDialog', '$filter', '$rootScope',
    function ($scope, $location, $mdDialog, $filter, $rootScope) {

        /**
         * Edita rutinas en la fecha, agregar rutina
         */
        $scope.changeDate = function changeDate(date){
            $scope.indices = [];
            $scope.currentRoutines = [];
            $scope.currentDate= moment(date).format('ll');
            hasRoutines();
            var date = new Date($scope.currentDate);
            if($scope.hasroutines){
                for (var property in $scope.dates[$scope.currentDate]) {
                    if ($scope.dates[$scope.currentDate].hasOwnProperty(property)) {
                        $rootScope.user.rutinas[property].terminado = $rootScope.user.calendario.dias[$scope.currentDate][property];
                        $scope.currentRoutines.push($rootScope.user.rutinas[property]);
                        $scope.indices.push(property);
                    }
                }
            }
        }

        $scope.finishRoutine = function finishRoutine(routine, index){
            var i = $scope.indices[index];
           $rootScope.user.calendario.dias[$scope.currentDate][i] = true;
           $rootScope.user.terminarRutina($scope.currentDate, i, routine.terminado);
        }

        var hasRoutines = function hasRoutines(){
            if($scope.dates[$scope.currentDate]){
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

            if($rootScope.userType === 0){
                $rootScope.user.calendario.dias = JSON.parse(localStorage.getItem('dates'));
                $scope.dates = $rootScope.user.calendario.dias;
            } else{
                $rootScope.getStudent();
                $scope.dates = JSON.parse(localStorage.getItem('currentStudentDates'));
                $scope.routines = JSON.parse(localStorage.getItem('currentStudentRoutines'));
            }
            $scope.currentDate = moment().format('ll');
            $scope.indices = [];
        }

        init();

    }
]);