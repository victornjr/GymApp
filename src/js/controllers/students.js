angular.module('gymApp').controller('StudentsCtrl', ['$scope', '$rootScope', '$firebaseObject', '$location',function ($scope, $rootScope, $firebaseObject,$location) {

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

    $scope.studentDetails = function studentDetails(student){
        $location.path('/alumnos/'+student.id+'/'+student.name)
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
