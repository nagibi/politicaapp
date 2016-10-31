angular.module('starter')
.controller('RegistrarCtrl', ['UtilService', '$rootScope', '$scope', '$http', 'LoginService', '$ionicPopup', '$timeout', '$state', 'jwtHelper', 'store', '$ionicLoading', 'ProfileService', function (UtilService,$rootScope, $scope, $http, LoginService, $ionicPopup, $timeout, $state, jwtHelper, store, $ionicLoading, ProfileService) {

    $scope.cadastrar = function (user) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        LoginService.signup(user).then(
            function (resp) {

                var msg = '';

                //Bad request
                if (resp.status == '400') {
                    msg = '<p><strong>Error!</strong></p>';
                    msg += '<ul>';
                    if (resp.data.modelState['createUserModel.ConfirmPassword'] != null) msg += '<li>- ' + resp.data.modelState['createUserModel.ConfirmPassword'] + '</li>';
                    if (resp.data.modelState[''] != null) msg += '<li>- ' + resp.data.modelState[''] + '</li>';
                    if (resp.data.modelState['createUserModel.Email'] != null) msg += '<li>- ' + resp.data.modelState['createUserModel.Email'] + '</li>';
                    msg += '</ul>';

                    UtilService.createMessage('danger', msg);
                    alertPopup = $ionicPopup.alert({ title: 'Error', template: resp.data.message });
                } else {
                    $state.go('tab.login', {}, { reload: true });
                    UtilService.createMessage('success', msg); msg = '<p><strong>Sucesso!</strong></p><p>Registro criado com sucesso!</p>';
                }
                $ionicLoading.hide();
            }
        );
    }
}]);
