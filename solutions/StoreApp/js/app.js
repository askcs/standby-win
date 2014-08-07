'use strict';

define(
  [
    'angular',
    'controllers/controllers',
    'services/services',
    'filters/filters',
    'directives/directives',
    'angular-route',
    'angular-resource'
  ],
  function (angular) {
    return angular.module('StandByApp',
      [
        'controllers',
        'services',
        'filters',
        'directives',
        'ngRoute',
        'ngResource'
      ]);
  }
);