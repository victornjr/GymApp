angular.module('gymApp').controller('SidenavCtrl', ['$scope', '$location', '$window', '$rootScope', function ($scope, $location, $window, $rootScope) {

    $scope.navigateTo = function navigateTo(url) {
        $location.path(url);

    }

    $scope.logout = function logout() {
        $window.localStorage.clear();
        $location.path('/login');
    }


}
]);