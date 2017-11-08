angular.module('gymApp')
    .controller('LoginCtrl', [
        '$scope', '$rootScope', '$location',
        function ($scope, $rootScope, $location) {
            console.log("LoginView");
            $scope.user = { email: undefined, password: undefined }

            if (localStorage.getItem('user') != null) {
                $location.path("/home");
            }

            $scope.login = function login() {
                if ($scope.user.email != undefined && $scope.user.password != undefined) {
                    localStorage.setItem('user', JSON.stringify($scope.user));
                    if ($scope.first) {
                        $location.path("/cuestionario");
                    } else
                        $location.path("/home");
                }
            }

            var init = function init() {
                $scope.first = true;
            }

            init();
        }
    ]);
