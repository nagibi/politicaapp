angular.module('starter')
.service('LoginService', function ($http, $q, store, constantes, $rootScope, jwtHelper, DbService) {

    return ({
        login: login,
        logout: logout,
        signup: signup,
        confirmEmail: confirmEmail,
        forgotPassword: forgotPassword,
        confirmPasswordChange: confirmPasswordChange,
        confirmEmailchangePassword: confirmEmailchangePassword
    });

    //login
    function login(username, password) {
        var request = $http({
            url: constantes.url + '/oauth/token',
            method: "POST",
            data: 'grant_type=password&username=' + username + '&password=' + password,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(
          function (response) {

              store.set("jwt", response.data["access_token"]);
              var token = jwtHelper.decodeToken(store.get("jwt"));
              $rootScope.profileId = token["nameid"];
              $rootScope.unique_name = token["unique_name"];

              return DbService.create().then(function (result) {
                  return DbService.insert(store.get("jwt"), token["nameid"], token["unique_name"]).then(function (result) {
                      return response;
                  });
              });
          },
          function (error) {
              return error;
          }
        );
        return request;
    }

    //logout
    function logout() {
        store.remove("jwt");
        return DbService.create().then(function (result) {
            return DbService.deletar().then(function (result) {
                return true;
            });
        });
    }

    //signup
    function signup(user) {
        var request = $http({
            url: constantes.urlApi + '/accounts/create',
            method: "POST",
            data: user,
            headers: { "Content-Type": "application/json" }
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

    //confirmEmail
    function confirmEmail(userId, code) {
        var request = $http({
            url: constantes.urlApi + '/accounts/ConfirmEmail?userId=' + userId + '&code=' + encodeURIComponent(code),
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