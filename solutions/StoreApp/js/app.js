'use strict';

define(
  [
    'angular',
    'controllers/controllers',
    'services/services',
    'filters/filters',
    'directives/directives',
    'angular-route',
    'angular-resource',
    'angular-winjs'
  ],
  function (angular) {
    return angular.module('StandByApp',
      [
        'controllers',
        'services',
        'filters',
        'directives',
        'ngRoute',
        'ngResource',
        'winjs'
      ]);
  }
);