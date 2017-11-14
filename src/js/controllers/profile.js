angular.module('gymApp').controller('ProfileCtrl', ['$scope', '$rootScope', '$firebaseObject', function ($scope, $rootScope, $firebaseObject) {


    var init = function init() {
        $rootScope.getUser();
    }

    init();
}
]);
