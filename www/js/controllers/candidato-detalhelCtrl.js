angular.module('starter')
.controller('CandidatoDetalhelCtrl', function ($scope, $stateParams, CandidateService, $ionicLoading, constantes) {

    $scope.carregarEvento = function () {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        CandidateService.get($stateParams.candidatoId).then(
        function (result) {
            //Bad request
            if (result.status == '400') {
                var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar candidato!' });
            } else {
                result.data.Photo = constantes.urlSemImagem;
                $scope.candidate = result.data;
            }
            $ionicLoading.hide();
        });
    }

    $scope.carregarEvento();
})