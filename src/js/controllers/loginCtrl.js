angular.module('gymApp')
    .controller('LoginCtrl', [
        '$scope', '$rootScope', '$location', '$http',
        function ($scope, $rootScope, $location, $http) {

            if (localStorage.getItem('user') != null) {
                $location.path("/inicio");
            } else {
                $location.path("/login");
            }

            $scope.login = function login() {
                //var valid = iniciarSesion($scope.user.email, $scope.user.password);
                var valid = true;
                if(valid){
                    if($scope.first)
                        $location.path("/cuestionario");
                    else   
                        $location.path("/inicio");
                }
            }

            var init = function init() {
                $scope.first = true;
                $scope.user = { email: undefined, password: undefined }
            }

            init();
        }
    ]);
