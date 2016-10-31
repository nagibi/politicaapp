
angular.module('starter')
.controller('HomeCtrl', ['$ionicPopup', '$rootScope', '$scope', '$http', 'PostService', 'ProfileService', '$ionicLoading', 'constantes', '$q', function ($ionicPopup, $rootScope, $scope, $http, PostService, ProfileService, $ionicLoading, constantes, $q) {

    $scope.posts = [];

    $scope.onClickCurtir = function (post) {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
        PostService.addLike({ PostId: post.PostId, ProfileId: $rootScope.profileId }).then(
            function (result) {
                //Bad request
                if (result.status == '400') {
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao curtir o post!' });
                } else {
                    post.IsPostLike = true;
                    post.CountLikes = post.CountLikes + 1;
                    post.Curtir = 'Curtido';
                }

                $ionicLoading.hide();
            }
        );
    }

    $scope.$on('$ionicView.enter', function (e) { });

    $scope.carregarPostsAntigos = function (count) {

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });

        var minDate = $scope.posts.length > 0 ? $scope.posts[$scope.posts.length - 1].Updated : null;
        PostService.all(count, minDate).then(
            function (result) {

                //Bad request
                if (result.status == '400') {
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar os posts!' });
                } else {

                    var post = {};
                    var profiles = [];
                    var postikes = [];

                    for (var i = 0; i < result.data.length; i++) {
                        var obj = result.data[i];

                        //GetTitle
                        var er = new RegExp("<h1>|</h1>", "g");
                        var resultado = obj.Html.split(er);
                        title = resultado.length > 1 ? resultado[1] : 'Título';

                        //Html
                        result.data.Html = resultado.length > 1 ? resultado[2] : obj.Html;
                        result.data.Html = result.data.Html.replace('img', 'img class="full-image"');

                        //Profile 
                        var profileRequest = ProfileService.get(obj.ProfileId).then(function (profileResult) {
                            return profileResult.data.Photo == null ? constantes.urlSemImagem : profileResult.data.Photo;
                        });

                        post = {
                            PostId: obj.PostId,
                            Title: title,
                            Html: result.data.Html,
                            ProfileId: obj.ProfileId,
                            Updated: obj.Updated,
                            CountLikes: obj.CountLikes,
                            Curtir: 'Curtir'
                        }

                        profiles.push(profileRequest);

                        $scope.posts.push(post);
                        //$scope.posts.unshift(post);
                    }

                    //if (profiles.length > 0) {
                    //$q.all(profiles).then(function (profiles) {
                    if (profiles.length > 0) {

                        for (var i = $scope.posts.length - result.data.length; i < $scope.posts.length; i++) {

                            //IsPostLike 
                            var postLikeRequest = PostService.isPostLike($scope.posts[i].PostId, $rootScope.profileId).then(function (postLikeResult) {
                                return postLikeResult.data;
                            });
                            postikes.push(postLikeRequest);
                        }

                        $q.all(profiles).then(function (profiles) {
                            var indexJ = $scope.posts.length - profiles.length;
                            var valueNew = 0;
                            for (var j = 0; j < profiles.length; j++) {
                                valueNew = indexJ + j;
                                $scope.posts[valueNew].Profile = profiles[j];
                            }
                        });

                        $q.all(postikes).then(function (postikes) {
                            var index = $scope.posts.length - postikes.length;
                            var value = 0;
                            for (var i = 0; i < postikes.length; i++) {
                                value = index + i;
                                $scope.posts[value].IsPostLike = postikes[i];
                                $scope.posts[value].Curtir = $scope.posts[value].IsPostLike == true ? 'Curtido' : 'Curtir';
                            }

                            $ionicLoading.hide();
                            //$scope.$broadcast('scroll.refreshComplete');

                        });
                        //});
                    } else {

                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({ title: 'Aviso', template: 'Não existe novos posts!' });
                    }
                }
            });
    }

    $scope.carregarPostsNovos = function (count) {

        var minDate = null;
        PostService.all(count, minDate).then(
            function (result) {

                //_.where(this.value.aplicacoes, { nome: "PONTO_ACESSO" })

                //Bad request
                if (result.status == '400') {
                    var alertPopup = $ionicPopup.alert({ title: 'Error', template: 'Error ao carregar os posts!' });
                } else {

                    var value = $scope.posts;
                    var post = {};
                    var profiles = [];
                    var postikes = [];

                    result.data.reverse()

                    for (var i = 0; i < result.data.length; i++) {
                        var obj = result.data[i];

                        if (_.filter(value, function (item) { return item.PostId == obj.PostId; }).length <= 0) {

                            //GetTitle
                            var er = new RegExp("<h1>|</h1>", "g");
                            var resultado = obj.Html.split(er);
                            title = resultado.length > 1 ? resultado[1] : 'Título';

                            //Html
                            result.data.Html = resultado.length > 1 ? resultado[2] : obj.Html;
                            result.data.Html = result.data.Html.replace('img', 'img class="full-image"');

                            //Profile 
                            var profileRequest = ProfileService.get(obj.ProfileId).then(function (profileResult) {
                                return profileResult.data.Photo == null ? constantes.urlSemImagem : profileResult.data.Photo;
                            });

                            post = {
                                PostId: obj.PostId,
                                Title: title,
                                Html: result.data.Html,
                                ProfileId: obj.ProfileId,
                                Updated: obj.Updated,
                                CountLikes: obj.CountLikes,
                                Curtir: 'Curtir'
                            }

                            profiles.push(profileRequest);

                            $scope.posts.unshift(post);
                        }
                    }

                    if (profiles.length > 0) {
                        for (var i = 0; i < count; i++) {

                            var obj = $scope.posts[i];

                            //IsPostLike 
                            var postLikeRequest = PostService.isPostLike($scope.posts[i].PostId, $rootScope.profileId).then(function (postLikeResult) {
                                return postLikeResult.data;
                            });
                            postikes.push(postLikeRequest);
                        }

                        $q.all(profiles).then(function (profiles) {

                            for (var i = 0; i < count; i++) {
                                $scope.posts[i].Profile = profiles[i];
                            }
                        });

                        $q.all(postikes).then(function (postikes) {
                            for (var i = 0; i < count; i++) {
                                $scope.posts[i].IsPostLike = postikes[i];
                                $scope.posts[i].Curtir = postikes[i] == true ? 'Curtido' : 'Curtir';
                            }

                            $scope.$broadcast('scroll.refreshComplete');

                        });
                    } else {
                        $scope.$broadcast('scroll.refreshComplete');
                        var alertPopup = $ionicPopup.alert({ title: 'Aviso', template: 'Não existe novos posts!' });
                    }
                }
            });
    }

    $scope.carregarPostsNovos(2);
}]);