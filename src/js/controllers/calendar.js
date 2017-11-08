angular.module('gymApp').controller('CalendarCtrl', ['$scope', '$location', '$mdDialog', '$filter',
    function ($scope, $location, $mdDialog, $filter) {
        $scope.changeDate = function changeDate(date){
            $scope.currentDate= date;
        }


        var init = function init(){
            $scope.currentDate = moment().format('ll');
        }

        init();

    }
]);