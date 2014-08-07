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
    'config',
    'run',
    'controllers/login',
    'services/standby',
    'lib/md5'
  ],
  function (angular, app, domReady) {
    'use strict';

    domReady(function () { angular.bootstrap(document, ['StandByApp']) });
  }
);