angular.module('gymApp').controller('CalendarCtrl', ['$scope', '$location', '$mdDialog', '$filter', '$rootScope',
    function ($scope, $location, $mdDialog, $filter, $rootScope) {

        /**
         * Edita rutinas en la fecha, agregar rutina
         */
        $scope.changeDate = function changeDate(date){
            $scope.currentRoutines = [];
            $scope.currentCardio = [];
            $scope.currentDate= moment(date).format('ll');
            var index = 0;
            $scope.routines.map(function(item){
                if(item.dia === moment(date).format('dddd')){
                    item.terminado = false;
                    $scope.currentRoutines.push(item);
                    $scope.indices.push(index);
                    index++;
                    for (var property in $scope.dates[$scope.currentDate]) {
                        if ($scope.dates[$scope.currentDate].hasOwnProperty(property) && $scope.dates[$scope.currentDate][property] != null) {
                            $scope.currentRoutines[$scope.currentRoutines.length-1].terminado = true;
                            /*if($rootScope.userType === 0){
                                $rootScope.user.rutinas[property].terminado = $rootScope.user.calendario.dias[$scope.currentDate][property];
                                $scope.currentRoutines.push($rootScope.user.rutinas[property]);
                            } else{
                                $scope.routines[property].terminado = $scope.dates[$scope.currentDate][property];
                                $scope.currentRoutines.push($scope.routines[property]);
                            }*/
                        }
                    }
                }
            });
            $scope.cardio.map(function(item){
                var date = new Date(item.fecha);
                date = moment(date).format('ll');
                if(date == $scope.currentDate){
                    $scope.currentCardio.push(item);
                }
            });
        }

        $scope.finishRoutine = function finishRoutine(routine, index){
            var i = $scope.indices[index];
            
            if(!$rootScope.user.calendario.dias[$scope.currentDate]){
                $rootScope.user.calendario.dias[$scope.currentDate] = {}
            }
           $rootScope.user.calendario.dias[$scope.currentDate][i] = true;
           $rootScope.user.terminarRutina($scope.currentDate, i, routine.terminado);
           $scope.dates = $rootScope.user.calendario.dias;
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
                $rootScope.getCardio();
            } 
            $scope.mediums = ["Trote pista", "Caminadora", "Elíptica","Bici Ergonómica","Bici Spinning","Escalera","Elasticidad"];
            if($rootScope.userType === 0){
                $rootScope.user.calendario.dias = JSON.parse(localStorage.getItem('dates'));
                $scope.cardio = JSON.parse(localStorage.getItem('currentCardio'));
                if($rootScope.user.calendario.dias === null){
                    $rootScope.user.calendario = new Calendario();
                    $rootScope.user.calendario.dias = {}
                }
                $scope.dates = $rootScope.user.calendario.dias;
                $scope.routines = JSON.parse(localStorage.getItem('currentRoutines'));
                
            } else{
                $scope.dates = JSON.parse(localStorage.getItem('currentStudentDates'));
                $scope.routines = JSON.parse(localStorage.getItem('currentStudentRoutines'));
            }
            $scope.currentDate = moment().format('ll');
            $scope.indices = [];
        }

        init();

    }
]);