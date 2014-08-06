requirejs.isBrowser = false;

requirejs.config(
  {
    baseUrl: '/js',
    paths: {
      angular: 'lib/angular',
      'angular-route': 'lib/angular-route',
      jquery: 'lib/jquery',
      domReady: 'lib/domReady'
    },
    shim: {
      angular: {
        deps: ['jquery'],
        exports: 'angular'
      },
      'angular-route': { deps: ['angular'] }
    }
  }
);

require(
  [
    'angular',
    'app',
    'domReady',
    'angular-route',
    'run',
    'config',
    'controllers/home',
    'controllers/partial1',
    'controllers/partial2',
    'directives/appVersion',
    'filters/interpolate',
    'services/version',
    'services/user'
  ],
  function (angular, app, domReady) {
    'use strict';

    app.config(
      [
        '$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/home',
            {
              templateUrl: 'views/home.html',
              controller: 'home'
            })
            .when('/partial1',
            {
              templateUrl: 'views/partial1.html',
              controller: 'partial1'
            })
            .when('/partial2',
            {
              templateUrl: 'views/partial2.html',
              controller: 'partial2'
            })
            .otherwise({
              redirectTo: '/home'
            });
        }
      ]
    );

    domReady(function () { angular.bootstrap(document, ['StandBy']) });
  }
);