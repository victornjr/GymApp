angular.module('gymApp').controller('HomeCtrl', ['$scope', '$rootScope', '$firebaseObject', function ($scope, $rootScope, $firebaseObject) {


    var getRequests = function getRequests() {
        $scope.requests = [];
        var ref = firebase.database().ref('entrenadores/' + $rootScope.userId + '/solicitudes');
        var data = $firebaseObject(ref);
        data.$loaded().then(function () {
            angular.forEach(data, function (value, key) {
                var ref2 = firebase.database().ref('alumnos/' + value + '/nombre')
                var studentId = value;
                var student = $firebaseObject(ref2);
                student.$loaded().then(function () {
                    $scope.requests.push({ id: studentId, name: student.$value });
                });
            });
        });
    }

    $scope.answerRequest = function answerRequest(answer, studentId, index) {
        $rootScope.user.responderSolicitud(answer, studentId);
        $scope.requests.splice(index, 1);
    }

    var init = function init() {
        $rootScope.getUser();
        $rootScope.getStudents();
        $rootScope.getRoutines();
        getRequests();
    }

    init();
}
]);
