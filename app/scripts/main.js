requirejs.isBrowser = false;

requirejs.config(
  {
    baseUrl: '/scripts',
    paths: {
      jquery: 'lib/jquery',
      angular: 'lib/angular',
      'angular-route': 'lib/angular-route',
      'angular-resource': 'lib/angular-resource',
      'angular-winjs': 'lib/angular-winjs',
      domReady: 'lib/domReady'
    },
    shim: {
      angular: {
        deps: ['jquery'],
        exports: 'angular'
      },
      'angular-route': { deps: ['angular'] },
      'angular-resource': { deps: ['angular'] },
      'angular-winjs': { deps: ['angular'] }
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
    'angular-winjs',
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