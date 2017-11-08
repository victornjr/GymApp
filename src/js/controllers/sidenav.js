angular.module('gymApp')
    .controller('SidenavCtrl', ['$scope', '$location', '$window',
        function ($scope, $location, $window) {

            $scope.navigateTo = function navigateTo(url){
                $location.path(url);
                
            }

            $scope.logout = function logout(){
                $window.localStorage.clear();
                $location.path('/login');
            }
        }
    ]);