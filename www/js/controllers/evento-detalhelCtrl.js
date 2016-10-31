angular.module('starter')
.controller('EventoDetalhelCtrl', function ($scope, $stateParams, EventoService, $ionicLoading) {

    $scope.carregarEvento = function () {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        EventoService.get($stateParams.eventoId).then(
        function (result) {
            //Bad request
            if (result.status == '400') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error ao carregar evento!'
                });
            } else 
                $scope.evento = result.data;
            
            $ionicLoading.hide();
        });
    }

    $scope.carregarEvento();
})