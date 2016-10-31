angular.module('starter')
.service('ProfileService', function ($http, $q, store, constantes) {

    return ({
        all: all,
        get: get,
        save: save,
    });

    //All
    function all(count) {
        var request = $http({
            url: constantes.urlApi + '/profile?count=' + count,
            method: "GET"
        }).then(
          function (response) {
              return response;
          },
          function (error) {
              return error;
          }
        );
        return request;
    }

    function save(profile){
        var promise = $http({
            url: constantes.urlApi + '/profile',
            method: "POST",
            data: profile,
            headers: { "Content-Type": "application/json" }
        }).then(
            response => {
                return response;
            }, error => {
                return error;
            });

        return promise;
    }

    //Get
    function get(id) {
        var request = $http({
            url: constantes.urlApi + '/profile/' + id,
            method: "GET"
        }).then(
          function (response) {
              return response;
          },
          function (error) {
              return error;
          }
        );
        return request;
    }

});