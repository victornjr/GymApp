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
                $http.get('database/usuario.json').
                    then(function (response) {
                        var data = response.data;
                        for(var i = 0; i < data.length; i++){
                            if(data[i].email === $scope.user.email && data[i].password === $scope.user.password){
                                $scope.valid = true;
                                $rootScope.user = new Usuario(data[i].name,data[i].email, data[i].password);
                                return;
                            }
                        }
                        console.log($rootScope.user);
                    });
                if ($scope.valid) {
                    if ($scope.first)
                        $location.path("/cuestionario");
                    else
                        $location.path("/inicio");
                }
            }

            var init = function init() {
                $scope.first = true;
                $scope.user = { email: undefined, password: undefined }
                $scope.valid = false;
                $rootScope.user;
            }

            init();
        }
    ]);
