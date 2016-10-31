
angular.module('starter')
.controller('EventoCtrl', ['$scope', 'EventoService', '$ionicLoading', function ($scope, EventoService, $ionicLoading) {

    $scope.$on('$ionicView.enter', function (e) {});

    $scope.carregarEventos = function () {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        EventoService.all().then(
            function (result) {

                //Bad request
                if (result.status == '400')
                    var alertPopup = $ionicPopup.alert({title: 'Error', template: 'Error ao carregar os eventos!' });
                else
                    $scope.eventos = result.data;

                $ionicLoading.hide();
            }
        );

    }
    $scope.carregarEventos();
}]);