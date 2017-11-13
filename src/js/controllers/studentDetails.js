angular.module('gymApp').controller('StudentDetailsCtrl', ['$scope', '$rootScope', '$firebaseObject', '$routeParams',function ($scope, $rootScope, $firebaseObject,$routeParams) {
    
        $scope.setTab = function setTab(index){
            $scope.currentTab = index;
        }

        $scope.createRoutine = function createRoutine(){
            $rootScope.creating = true;
        }
    
        $scope.cancel = function cancel(){
            $rootScope.creating = false;
        }

        var init = function init() {
            localStorage.setItem('studentId',$routeParams.id);
            $rootScope.getUser();
            $rootScope.getStudent();
            $scope.currentTab = 0;
        }
    
        init();
    }
    ]);
    