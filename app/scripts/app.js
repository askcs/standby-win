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
    'angular-winjs',
    'angular-md5'
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
        'winjs',
        'ngMd5'
      ]);
  }
);