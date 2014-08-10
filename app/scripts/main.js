requirejs.isBrowser = false;

requirejs.config(
  {
    baseUrl: '/scripts',
    paths: {
      domReady: 'vendors/requirejs-domready/domReady',
      jquery: 'vendors/jquery/dist/jquery',
      angular: 'vendors/angular/angular',
      'angular-route': 'lib/angular-route',
      'angular-resource': 'vendors/angular-resource/angular-resource',
      'angular-route': 'vendors/angular-route/angular-route',
      'angular-winjs': 'vendors/angular-winjs/js/angular-winjs',
      'angular-md5': 'vendors/angular-md5/angular-md5'
    },
    shim: {
      angular: {
        deps: ['jquery'],
        exports: 'angular'
      },
      'angular-route': { deps: ['angular'] },
      'angular-resource': { deps: ['angular'] },
      'angular-winjs': { deps: ['angular'] },
      'angular-md5': { deps: ['angular'] }
    }
  }
);

require(
  [
    'angular',
    'app',
    'domReady',
    'config',
    'run',
    'controllers/login',
    'services/standby'
  ],
  function (angular, app, domReady) {
    'use strict';

    domReady(function () {
      angular.bootstrap(document, ['StandByApp']);
    });
  }
);