angular.module('gymApp').controller('StudentsCtrl', ['$scope', '$rootScope', '$firebaseObject', function ($scope, $rootScope, $firebaseObject) {

    var getStudentsDets = function getStudentsDets(){
        $scope.students = [];
        $scope.user.alumnos.map(function(item){
            var ref = firebase.database().ref('alumnos/' + item + '/nombre');
            var data = $firebaseObject(ref);
            data.$loaded().then(function () {
                $scope.students.push({id: item, name: data.$value});
            });
        });
    }

    $scope.studentDetails = function studentDetails(studentId){
        
    }


    var init = function init() {
        $rootScope.getUser();
        $rootScope.getStudents();
        $scope.user = JSON.parse(localStorage.getItem('user'));
        getStudentsDets();
        //$scope.students = $rootScope.user.alumnos;
    }

    init();
}
]);
