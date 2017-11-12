angular.module('gymApp').controller('StudentDetailsCtrl', ['$scope', '$rootScope', '$firebaseObject', function ($scope, $rootScope, $firebaseObject) {
    
        
    
    
        var init = function init() {
            $rootScope.getUser();
            getStudentsDets();
            //$scope.students = $rootScope.user.alumnos;
        }
    
        init();
    }
    ]);
    