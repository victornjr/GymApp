angular.module('gymApp').controller('QuestionnaireCtrl', ['$scope', '$location', '$mdDialog', '$filter',
    function ($scope, $location, $mdDialog, $filter) {

        $scope.submit = function submit(){
            $location.path("/inicio");
        }
    }
]);