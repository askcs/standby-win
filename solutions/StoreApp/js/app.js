'use strict';

define(
  [
    'angular',
    'controllers/controllers',
    'services/services',
    'filters/filters',
    'directives/directives',
    'angular-route'
  ],
  function (angular) {
    return angular.module('StandBy',
      [
        'controllers',
        'services',
        'filters',
        'directives',
        'ngRoute'
      ]);
  }
);