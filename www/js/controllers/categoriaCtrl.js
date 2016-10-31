
angular.module('starter')
.controller('CategoriaCtrl', ['$scope', 'PlanoCategoriaService', '$ionicLoading', function ($scope, PlanoCategoriaService, $ionicLoading) {

    $scope.$on('$ionicView.enter', function (e) {});

    $scope.carregarPlanoCategorias = function (count) {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        PlanoCategoriaService.all().then(
            function (result) {

                //Bad request
                if (result.status == '400') {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Error ao carregar as categorias!'
                    });
                } else 
                    $scope.planoCategorias = result.data;

                $ionicLoading.hide();
            }
        );

    }
    $scope.carregarPlanoCategorias();
}]);