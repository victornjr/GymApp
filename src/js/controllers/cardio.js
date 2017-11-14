angular.module('gymApp').controller('CardioCtrl', ['$scope', '$rootScope', '$firebaseObject', function ($scope, $rootScope, $firebaseObject) {
    
    
        var init = function init() {
            $rootScope.getUser();
        }
    
        init();
    }
    ]);
    