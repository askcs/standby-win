requirejs.isBrowser = false;

requirejs.config(
  {
    baseUrl: '/js',
    paths: {
      angular: 'lib/angular',
      'angular-route': 'lib/angular-route',
      'angular-resource': 'lib/angular-resource',
      jquery: 'lib/jquery',
      domReady: 'lib/domReady'
    },
    shim: {
      angular: {
        deps: ['jquery'],
        exports: 'angular'
      },
      'angular-route': { deps: ['angular'] },
      'angular-resource': { deps: ['angular'] }
    }
  }
);

require(
  [
    'angular',
    'app',
    'domReady',
    'angular-route',
    'angular-resource',
    'run',
    'config',
    'controllers/home',
    'controllers/partial',
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
              templateUrl: 'js/views/home.html',
              controller: 'home'
            })
            .when('/partial',
            {
              templateUrl: 'js/views/partial.html',
              controller: 'partial'
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