define(
  ['directives/directives', 'config'],
  function (directives, config) {
    'use strict';

    directives.directive('appInfo',
      [
        function () {
          return {
            restrict: 'EA',
            template: "<p>{{ 'Current version is v%VERSION%. Released: %RELEASED%' | interpolate }}</p>",
            link: function (scope, elm, attrs) {
            }
          };
        }
      ]
    );
  }
);