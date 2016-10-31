
angular.module('starter')
.controller('CandidatoCtrl', ['$scope', 'CandidateService', '$ionicLoading', 'constantes', function ($scope, CandidateService, $ionicLoading, constantes) {

    $scope.$on('$ionicView.enter', function (e) {});

    $scope.carregarCandidatos = function () {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        CandidateService.all().then(
            function (result) {

                //Bad request
                if (result.status == '400')
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar os candidatos!' });
                else {
                    for (var i = 0; i < result.data.length; i++) {
                        result.data[i].Photo = constantes.urlSemImagem;
                    }
                    $scope.candidatos = result.data;
                }
                $ionicLoading.hide();
            }
        );

    }
    $scope.carregarCandidatos();
}]);