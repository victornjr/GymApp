angular.module('gymApp').controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$http', '$firebaseObject', function ($scope, $rootScope, $location, $http, $firebaseObject) {

    /**
     * Cambiar atributo de first a false para que no vaya al cuestionario
     * Agregar registro
     * Validar los campos, deshabilitar botón si no están llenos
     * Correo y/o contraseña incorrectos
     */

    $scope.login = function login() {
        var userType = $scope.user.email.split("")[0] === 'A' ? "alumnos" : "entrenadores";
        var ref = firebase.database().ref(userType);
        $scope.userdata = $firebaseObject(ref);
        $scope.userdata.$loaded().then(function () {
                var loggedUser;
                angular.forEach($scope.userdata, function (value, key) {
                    if (value.correo === $scope.user.email && value.contrasena === $scope.user.password) {
                        $scope.valid = true;
                        $rootScope.userId = key;
                        localStorage.setItem('userId', key);
                        loggedUser = $scope.userdata[key];
                        return;
                    }
                });
                $scope.temp(userType, loggedUser);
            });
    }

    $scope.temp = function temp(userType, loggedUser) {
        if ($scope.valid) {
            $rootScope.user = userType === "alumnos" ? new Alumno(loggedUser.nombre, loggedUser.correo, loggedUser.contrasena)
                : new Entrenador(loggedUser.nombre, loggedUser.coreo, loggedUser.contrasena);
            localStorage.setItem('user', JSON.stringify($rootScope.user));
            if (loggedUser.hasOwnProperty("cuestionario")) {
                query = database.child('alumnos/' + $rootScope.userId);
                query.once("value").then(function (res) {
                    //Alumno function
                    $rootScope.user.hacerCuestionario(res.val().cuestionario);
                    $location.path('/inicio');
                });
            }

            if (userType === 'entrenadores')
                $location.path("/inicio");
            else {
                $location.path("/cuestionario");
            }
        }
    }


    var init = function init() {
        if (localStorage.getItem('user') != null) {
            $location.path("/inicio");
        } else {
            $location.path("/login");
        }
        $scope.user = { email: undefined, password: undefined }
        $scope.valid = false;
        $rootScope.user;
    }

    init();
}
]);
        