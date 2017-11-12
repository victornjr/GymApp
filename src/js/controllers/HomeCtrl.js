angular.module('gymApp').controller('HomeCtrl', ['$scope','$rootScope', function($scope, $rootScope) {
        var init = function init(){
            $rootScope.getUser();
            $rootScope.getRoutines();
        }

        init();
    }
]);
