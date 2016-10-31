angular.module('starter')
.service('UtilService', function ($http, $q, store, constantes, $rootScope, $timeout) {

    return ({
        createMessage: createMessage
    });

    //createMessage
    function createMessage(tipo, msg, delay) {
        $rootScope.msg = '<div class="alert alert-' + tipo + '">'+ msg +'</div>';
        $timeout(function () {
            $rootScope.msg = '';
        }, 5000);
    }
});