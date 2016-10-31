angular.module('starter')
.service('PlanoCategoriaService', function ($http, $q, store, constantes) {

    return ({
        all: all,
        get: get,
    });

    //All
    function all() {
        var request = $http({
            url: constantes.urlApi + '/plancategory',
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
            url: constantes.urlApi + '/plancategory?id=' + id,
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