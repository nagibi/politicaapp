angular.module('starter')
.service('PostService', function ($http, $q, store, constantes) {

    return ({
        all: all,
        get: get,
        addLike: addLike,
        isPostLike: isPostLike
    });

    //All
    function all(count, minDate) {
        var request = $http({
            url: constantes.urlApi + '/post?count=' + count + '&minDate=' + minDate,
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

    //All
    function isPostLike(postId, profileId) {
        var request = $http({
            url: constantes.urlApi + '/PostLike/IsLiked?postId=' + postId + '&profileId=' + profileId,
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
            url: constantes.urlApi + '/post?id=' + id,
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
    
    function addLike(obj) {
        var request = $http({
            url: constantes.urlApi + '/PostLike',
            method: "POST",
            data:obj
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