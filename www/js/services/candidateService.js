angular.module('starter')
.service('CandidateService', function ($http, $q, store, constantes) {

    return ({
        all: all,
        get: get,
    });

    //All
    function all(count) {
        var request = $http({
            url: constantes.urlApi + '/candidate',
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

    //Get
    function get(id) {
        var request = $http({
            url: constantes.urlApi + '/candidate?id=' + id,
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