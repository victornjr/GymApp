angular.module('gymApp').controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$http', '$firebaseObject','$firebaseArray', function ($scope, $rootScope, $location, $http, $firebaseObject,$firebaseArray) {

    /**
     * Cambiar atributo de first a false para que no vaya al cuestionario
     * Agregar registro
     * Validar los campos, deshabilitar botón si no están llenos
     * Correo y/o contraseña incorrectos
     */

    $scope.toggleRegister = function toggleRegister(mode){
        $scope.mode = mode;
        $scope.regData = {
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
        $scope.disableConfirm = true;
        $scope.notFull = true;
    }

    var validateForm = function validateForm(){
        if($scope.regData.name != '' && !$scope.invalidEmail && !$scope.invalidPassword && !$scope.invalidConfirm){
            $scope.notFull = false;
        } else{
            $scope.notFull = true;
        }
    }

    $scope.signup = function signup(){
        var ref = firebase.database().ref('alumnos');
        var list = $firebaseArray(ref);
        var newUser = {
            nombre: $scope.regData.name,
            correo: $scope.regData.email,
            contrasena: $scope.regData.password
        }
        list.$add(newUser).then(function(ref) {
          $location.path('/login');
        });
    }

    $scope.validateEmail = function validateEmail(){
        if($scope.regData.email){
            var regex = /^\d{7}$/;
            var test = $scope.regData.email.substring(2,9).toString();
            if(!($scope.regData.email.substring(0,2) === 'A0' && $scope.regData.email.substring(2,9).toString().match(regex) && $scope.regData.email.substring(9).toString() === '@itesm.mx')){
              $scope.invalidEmail = true;
            }else{
                $scope.invalidEmail = false;
            }
        }
        validateForm();
    }

    $scope.validatePassword = function validatePassword(){
        if($scope.regData.password){
            if($scope.regData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
                $scope.invalidPassword = false;
                $scope.disableConfirm = false;
            } else{
                $scope.invalidPassword = true;
                $scope.disableConfirm = true;
            }
        } else{
            $scope.invalidPassword =true;
            $scope.disableConfirm = true;
        }
        validateForm();
    }

    $scope.confirmPassword = function confirmPassword(){
        if($scope.regData.confirmPassword !== $scope.regData.password){
          $scope.invalidConfirm = true;
        } else{
            $scope.invalidConfirm = false;
        }
        validateForm();
    }

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
                        localStorage.setItem('userType',userType);
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
        $scope.mode = 'login';
    }

    init();
}
]);
        