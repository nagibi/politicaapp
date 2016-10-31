angular.module('starter')
.controller('LoginCtrl', ['store', 'DbService', 'UtilService', '$rootScope', '$scope', '$http', 'LoginService', '$ionicPopup', '$timeout', '$state', 'jwtHelper', 'store', '$ionicLoading', 'ProfileService', function (store, dbService, UtilService, $rootScope, $scope, $http, LoginService, $ionicPopup, $timeout, $state, jwtHelper, store, $ionicLoading, ProfileService) {

    $scope.Photo = "img/login.fw.png";

    $scope.logout = function () {
        LoginService.logout();
        $rootScope.isLogged = false;
        $rootScope.Photo = "img/login.fw.png";
    }

    $scope.login = function (user) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        LoginService.login(user.username, user.password).then(
            function (resp) {
                //Bad request
                if (resp.status == '400') {
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: resp.data.error_description });
                } else {
                    $scope.carregarFoto();
                }
                $ionicLoading.hide();
            }
        );
    }

    $scope.salvar = function (profile) {
        profile.profileId = $rootScope.profileId;
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        ProfileService.save(profile).then(
            function (resp) {
                //Bad request
                if (resp.status == '400') {
                    msg = '<p><strong>Error!</strong></p>';
                    msg += '<ul>';
                    if (resp.data.data['PhoneNumber'] != null) msg += '<li>- ' + resp.data.data['PhoneNumber'] + '</li>';
                    if (resp.data.data['CellPhone'] != null) msg += '<li>- ' + resp.data.data['CellPhone'] + '</li>';
                    msg += '</ul>';

                    UtilService.createMessage('danger', msg);
                } else
                    $ionicPopup.alert({ title: 'Sucesso', template: 'Dados salvos!' });

                $ionicLoading.hide();
            }
        );
    }

    $scope.carregarFoto = function () {
        ProfileService.get($rootScope.profileId).then(function (resp) {
            if (resp.status == '400') {
                var alertPopup = $ionicPopup.alert({ title: 'Error', template: resp.data.error_description });
            } else {
                //$scope.Photo = resp.data.Photo == null ? constantes.urlSemImagem : resp.data.Photo;
                $rootScope.isLogged = true;
                $rootScope.profile = {};
                $rootScope.profile.ContactEmail = resp.data.ContactEmail;
                $rootScope.profile.FirstName = resp.data.FirstName;
                $rootScope.profile.LastName = resp.data.LastName;
                $rootScope.profile.PhoneNumber = resp.data.PhoneNumber;
                $rootScope.profile.CellPhone = resp.data.CellPhone;
                $state.go('tab.home', {}, { reload: true });
            }
        });
    }

    dbService.select().then(function (result) {
        if (result.rows.length > 0) {
            $rootScope.profileId = result.rows.item(0).profileId;
            $rootScope.unique_name = result.rows.item(0).unique_name;
            $rootScope.isLogged = true;
            $rootScope.isVible = '';
            store.set("jwt", result.rows.item(0).jwt);
            $scope.carregarFoto();
        }
    });
    //if ($rootScope.profileId != null) $scope.carregarFoto();
}]);
