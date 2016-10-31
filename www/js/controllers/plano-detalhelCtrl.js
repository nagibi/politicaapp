angular.module('starter')
.controller('PlanoDetalheCtrl', function ($rootScope, $scope, $stateParams, PlanoCategoriaService, PlanoService, $ionicPopup, $ionicLoading, ProfileService, $q, constantes) {

    $scope.data = {};
    $scope.comentarios = [];

    $scope.carregarPlano = function () {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        PlanoService.get($stateParams.planoId).then(
        function (result) {
            //Bad request
            if (result.status == '400') {
                var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar o pano!' });
            } else {
                result.data.Description = result.data.Description.replace('img', 'img class="full-image"');
                $scope.plano = result.data;
            }
            $scope.carregarComentarios()
        });
    }

    $scope.onClickComentar = function () {

        var myPopup = $ionicPopup.show({
            template: '<label class="item item-input">' +
                            '<textarea ng-model="data.texto" placeholder="Digite aqui..." rows="8" cols="10"></textarea>' +
                        '</label>',
            title: 'Comentário',
            scope: $scope,
            buttons: [
              { text: 'Cancelar' },
              {
                  text: '<b>Ok</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.texto) {
                          e.preventDefault();
                      } else {

                          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

                          var data = {
                              planId: $stateParams.planoId,
                              comment: $scope.data.texto,
                              profileId: $rootScope.profileId
                          }

                          //Add comentário
                          PlanoService.addComentario(data).then(
                              function (result) {
                                  $ionicLoading.hide();
                                  if (result.status == '400') {
                                      var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao cadastrar o comentário!' });
                                  } else {
                                    $scope.carregarComentarios()
                                }
                            });
                      }
                  }
              }
            ]
        });
    }

    $scope.carregarComentarios = function(){
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
        PlanoService.comentarios($stateParams.planoId).then(
            function (result) {
                if (result.status == '400') { var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao recuperar os comentários!' });
                } else {

                    var comentario = null;
                    var profiles = [];
                    var comentarios = [];

                    for (var i = 0; i < result.data.length; i++) {

                        var obj = result.data[i];

                        //Profile 
                        var profileRequest = ProfileService.get(obj.ProfileId).then(function (profileResult) {
                            return { FullName: profileResult.data.FullName, Photo: profileResult.data.Photo == null ? constantes.urlSemImagem : profileResult.data.Photo };
                        });

                        comentario = {
                            Comment: obj.Comment,
                        }

                        profiles.push(profileRequest);
                        comentarios.push(comentario);
                    }


                    $q.all(profiles).then(function (profiles) {
                        $scope.comentarios = [];
                        for (var i = 0; i < comentarios.length; i++) {
                            comentarios[i].Profile = profiles[i].Photo;
                            comentarios[i].FullName = profiles[i].FullName;
                            $scope.comentarios.push(comentarios[i]);
                        }
                        $scope.data.texto = '';
                        $ionicLoading.hide();
                    });
                }
            });
    }

    $scope.carregarPlano();
})