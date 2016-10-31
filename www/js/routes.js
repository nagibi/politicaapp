angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('bottom')
    $ionicConfigProvider.views.maxCache(5);
    $ionicConfigProvider.backButton.text('Voltar');
    $ionicConfigProvider.backButton.previousTitleText('Voltar');
    $ionicConfigProvider.tabs.style('ios');
    
    $stateProvider

      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

    //Login
    .state('tab.login', {
        url: '/login',
        views: {
            'tab-login': {
                templateUrl: 'templates/tab-login.html',
                controller: 'LoginCtrl'
            }
        }
    })

    //Login
    .state('tab.registrar', {
        url: '/registrar',
        views: {
            'tab-registrar': {
                templateUrl: 'templates/tab-registrar.html',
                controller: 'RegistrarCtrl'
            }
        }
    })

    //Evento
    .state('tab.evento-detalhe', {
        url: '/evento/:eventoId',
        views: {
            'tab-evento': {
                templateUrl: 'templates/evento-detalhe.html',
                controller: 'EventoDetalhelCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    .state('tab.evento', {
        url: '/evento',
        views: {
            'tab-evento': {
                templateUrl: 'templates/tab-evento.html',
                controller: 'EventoCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

     //Candidato
    .state('tab.candidato-detalhe', {
        url: '/candidato/:candidatoId',
        views: {
            'tab-candidato': {
                templateUrl: 'templates/candidato-detalhe.html',
                controller: 'CandidatoDetalhelCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    .state('tab.candidato', {
        url: '/candidato',
        views: {
            'tab-candidato': {
                templateUrl: 'templates/tab-candidato.html',
                controller: 'CandidatoCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    //Plano
    .state('tab.categoria', {
        url: '/categoria',
        views: {
            'tab-categoria': {
                templateUrl: 'templates/tab-categoria.html',
                controller: 'CategoriaCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    .state('tab.categoria-plano', {
        url: '/categoria/:categoriaId',
        views: {
            'tab-categoria': {
                templateUrl: 'templates/tab-categoria-plano.html',
                controller: 'PlanoCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    .state('tab.plano-detalhe', {
        url: '/plano/:planoId',
        views: {
            'tab-categoria': {
                templateUrl: 'templates/plano-detalhe.html',
                controller: 'PlanoDetalheCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    //Home
    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    })

    .state('tab.contato', {
        url: '/contato',
        views: {
            'tab-contato': {
                templateUrl: 'templates/tab-contato.html',
                controller: 'ContatoCtrl'
            }
        },
        data: {
            requiresLogin: true
        }
    });

    $urlRouterProvider.otherwise('/tab/login');

});