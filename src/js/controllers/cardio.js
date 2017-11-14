angular.module('gymApp').controller('CardioCtrl', ['$scope', '$rootScope', '$firebaseObject', function ($scope, $rootScope, $firebaseObject) {
    
        $scope.addNewCardio = function addNewCardio(){
            $scope.addnew = true;
        }

        $scope.setDate = function selectDate(date){
            $scope.newCardio.fecha = moment(date).format('ll');

        }

        $scope.createCardio = function createCardio(){
            $scope.cardio.map(function(item){
                delete item['$$hashKey'];
            });
            $scope.cardio.push(new Cardio($scope.newCardio.maquina, $scope.newCardio.tiempo, $scope.newCardio.fecha.toString()));
            $rootScope.user.agregarCardio($scope.cardio);
            $scope.addnew = false;
        }
    
        var init = function init() {
            $rootScope.getUser();
            $rootScope.getCardio();
            $scope.cardio = JSON.parse(localStorage.getItem('currentCardio'));
            $scope.addnew = false;
            $scope.newCardio = {maquina: "", tiempo:"",fecha:""}
            $scope.mediums = ["Trote pista", "Caminadora", "Elíptica","Bici Ergonómica","Bici Spinning","Escalera","Elasticidad"];
        }
    
        init();
    }
    ]);
    