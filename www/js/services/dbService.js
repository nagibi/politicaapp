angular.module('starter')
.service('DbService', function ($http, $q, store, constantes, $rootScope, jwtHelper) {

    var db = null;
    var deferred = null;

    return ({
        create: create,
        insert: insert,
        select: select,
        deletar: deletar,
        get: get
    });

    //create
    function create() {
        deferred = $q.defer();
        db = openDatabase("ecoporanga.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS login (id integer primary key, jwt text, profileId text, unique_name text)", null, function (tx, results) {
                deferred.resolve(results);
            }, function (tx, e) {
                console.log("Error: " + e.message);
                deferred.reject();
            });
        });
        return deferred.promise;
    }

    //insert
    function insert(jwt, profileId, unique_name) {
        deferred = $q.defer();
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO login (jwt, profileId, unique_name) VALUES (?,?,?)", [jwt, profileId, unique_name], function (tx, results) {
                deferred.resolve(results);
            }, function (tx, e) {
                console.log("Error: " + e.message);
                deferred.reject();
            });
        });
        return deferred.promise;
    }

    //delete
    function deletar() {
        deferred = $q.defer();
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM login", null, function (tx, results) {
                deferred.resolve(results);
            }, function (tx, e) {
                console.log("Error: " + e.message);
                deferred.reject();
            });
        });
        return deferred.promise;
    }

    //get
    function get() {
        return db;
    }

    //select
    function select() {
        deferred = $q.defer();
        db = openDatabase("ecoporanga.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql("SELECT jwt, profileId, unique_name FROM login", [], function (tx, results) {
                deferred.resolve(results);
            }, function (tx, e) {
                console.log("Error: " + e.message);
                deferred.reject();
            });
        });
        return deferred.promise;
    }

    //forgotPassword
    function forgotPassword(email) {
        var request = $http({
            url: constantes.urlApi + '/accounts/ResetPassword?email=' + email,
            method: "GET"
        }).then(
          function (response) {
              return response;
          },
          function (errerror) {
              debugger
              return error;
          }
        );
        return request;
    }

    //confirmPasswordChange
    function confirmPasswordChange(userId, code, newPassword) {
        var request = $http({
            url: constantes.urlApi + '/accounts/ConfirmPasswordChange?userId=' + userId + '&code=' + encodeURIComponent(code) + '&newPassword=' + encodeURIComponent(newPassword),
            method: "GET"
        }).then(
          function (response) {
              return response;
          },
          function (error) {
              debugger
              return error;
          }
        );
        return request;
    }

    //changePassword
    function confirmEmailchangePassword(changePassword) {
        var request = $http({
            url: constantes.urlApi + '/accounts/ChangePassword',
            method: "POST",
            data: changePassword,
            headers: { "Content-Type": "application/json" }
        }).then(
          function (response) {
              return response;

          },
          function (error) {
              debugger
              return error;

          }
        );
        return request;
    }

});