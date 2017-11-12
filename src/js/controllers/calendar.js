angular.module('gymApp').controller('CalendarCtrl', ['$scope', '$location', '$mdDialog', '$filter',
    function ($scope, $location, $mdDialog, $filter) {
        $scope.changeDate = function changeDate(date){
            $scope.currentDate= moment(date).format('ll');
        }


        var init = function init(){
            $scope.currentDate = moment().format('ll');
        }

        init();

    }
]);