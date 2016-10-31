
angular.module('starter')
.controller('PlanoCtrl', ['$q','$rootScope','$scope', 'PlanoCategoriaService', 'PlanoService', '$stateParams', '$ionicPopup', '$ionicLoading','ProfileService','constantes', function ($q, $rootScope, $scope, PlanoCategoriaService, PlanoService, $stateParams, $ionicPopup, $ionicLoading, ProfileService, constantes) {

    $scope.$on('$ionicView.enter', function (e) {});

    $scope.onClickNovaIdeia = function () {

        $scope.data = {};
        $scope.data.ProfileId = $rootScope.profileId;
        $scope.data.PlanCategoryId = $stateParams.categoriaId;

        var myPopup = $ionicPopup.show({
            template:   '<label class="item item-input">' +
                            '<input type="text" ng-model="data.Title" placeholder="Digite o Título"/>' +
                        '</label>' + 
                        '<label class="item item-input">' +
                            '<textarea ng-model="data.Description" placeholder="Digite aqui..." rows="8" cols="10"></textarea>' +
                        '</label>',
            title: 'Nova Idéia',
            scope: $scope,
            buttons: [
              { text: 'Cancelar' },
              {
                  text: '<b>Salvar</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.Title && !$scope.data.Description) {
                          e.preventDefault();
                      } else {
                          
                          $scope.cadastrarPlano($scope.data);
                      }
                  }
              }
            ]
        });
    }

    $scope.cadastrarPlano = function (data) {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        PlanoService.post($scope.data).then(
            function (result) {

                //Bad request
                if (result.status == '400') { var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar as categorias!' });
                } else {
                    var alertPopup = $ionicPopup.alert({ title: 'Sucesso!', template: 'Nova Idéia enviada!' });
                    $scope.carregarPlanos();
                }

                $ionicLoading.hide();
            }
        );
    }

    $scope.carregarPlanos = function () {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        PlanoService.categoria($stateParams.categoriaId).then(
            function (result) {

                //Bad request
                if (result.status == '400') {
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar as categorias!' });
                } else {
                    
                    var planos = [];
                    $scope.planos = [];
                    
                    for (var i = 0; i < result.data.length; i++) {
                        var obj = result.data[i];

                        var plano = {};
                        plano.PlanId = obj.PlanId;
                        plano.Title = obj.Title;
                        
                        //Profile
                        var planoRequest = ProfileService.get(obj.ProfileId).then( 
                            function (profileResult) { return profileResult.data.Photo == null ? constantes.urlSemImagem : profileResult.data.Photo; }
                        );
                        
                        $scope.planos.unshift(plano);
                        planos.push(planoRequest);
                    }
                    
                    $q.all(planos).then(function (data) {
                        for (var i = 0; i < $scope.planos.length; i++) {
                            $scope.planos[i].Profile = data[i];
                        }

                        $ionicLoading.hide();
                    });
                    
                }
            }
        );

    }

    $scope.carregarCategoria = function () {
        PlanoCategoriaService.get($stateParams.categoriaId).then(
            function (result) {

                //Bad request
                if (result.status == '400') {
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar o plano!' });
                } else {
                    $scope.categoria = result.data;
                }
            }
        );

    }

    $scope.carregarPlanos();
    $scope.carregarCategoria();
}]);