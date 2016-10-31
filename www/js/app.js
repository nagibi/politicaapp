angular.module('starter', ['ionic', 'ngMessages', 'ionic.service.core', 'angular-jwt', 'angular-storage'])
.constant("constantes", {
    'url': 'http://apipolitica.azurewebsites.net',
    'urlApi': 'http://apipolitica.azurewebsites.net/api',
    'urlSemImagem' : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=Sem+imagem'
})
.constant('_', window._)
.run(function ($rootScope, $state, store, $ionicPlatform, jwtHelper) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.data && toState.data.requiresLogin) {
            if (!store.get("jwt") || jwtHelper.isTokenExpired(store.get("jwt"))) {
                event.preventDefault();
                $rootScope.isLogged = false;
                $rootScope.isVible = 'hide';
            }

            if (store.get("jwt")) {
                var token = jwtHelper.decodeToken(store.get("jwt"));
                $rootScope.profileId = token["nameid"];
                $rootScope.unique_name = token["unique_name"];
                $rootScope.isLogged = true;
                $rootScope.isVible = '';
            }
        } 

    });

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) StatusBar.styleDefault();
    });


    //return dbService.select().then(function (result) {
    //    var teste = result;
    //});

    //var db = openDatabase("ecoporanga.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    //db.transaction(function (tx) {
    //    tx.executeSql("CREATE TABLE login (id integer primary key, jwt text, profileId text, unique_name text)");
    //    //tx.executeSql("CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    //});

    //db.transaction(function (tx) {
    //    tx.executeSql("INSERT INTO login (jwt, profileId, unique_name) VALUES (?,?,?)", ['nagibi', 'emanuel']);
    //});

    //db.transaction(function (tx) {
    //    tx.executeSql("SELECT firstname, lastname FROM people", [], function (tx, results) {
    //        if (results.rows.length > 0) {
    //            for (var i = 0; i < results.rows.length; i++) {
    //                console.log("Result -> " + results.rows.item(i).firstname + " " + results.rows.item(i).lastname);
    //            }
    //        }
    //    });
    //});


});