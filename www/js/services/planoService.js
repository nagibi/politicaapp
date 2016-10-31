angular.module('starter')
.service('PlanoService', function ($http, $q, store, constantes) {

    return ({
        all: all,
        get: get,
        post: post,
        categoria: categoria,
        comentarios: comentarios,
        addComentario: addComentario
    });

    //All
    function all(count) {
        var request = $http({
            url: constantes.urlApi + '/plan',
            method: "GET"
        }).then(
          function (response) {
              return response;
          },
          function (errerror) {
              return error;
          }
        );
        return request;
    }

    //Categoria
    function categoria(id) {
        var request = $http({
            url: constantes.urlApi + '/plan?planCategoryId=' + id,
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

    //Comentário
    function comentarios(id) {
        var request = $http({
            url: constantes.urlApi + '/planComment?planId=' + id,
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
    function addComentario(data) {
        var request = $http({
            url: constantes.urlApi + '/planComment?planId=' + data.planId,
            method: "POST",
            data: data
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
            url: constantes.urlApi + '/plan?id=' + id,
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

    //Post
    function post(data) {
        var request = $http({
            url: constantes.urlApi + '/plan',
            method: "POST",
            data: data
        }).then(
          function (response) {
              return response;
          },
          function (erro) {
              return error;
          }
        );
        return request;
    }

});