angular.module('starter')
.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function (store, DbService) {
        //return DbService.create().then(function (result) {
        //    return DbService.select().then(function (result) {
        //        if (result.rows.length > 0) {
        //            return result.results.rows.item(0).jwt;
        //        } else {
                    return store.get('jwt');
        //        }
        //    });
        //});
    };

    $httpProvider.interceptors.push('jwtInterceptor');
})