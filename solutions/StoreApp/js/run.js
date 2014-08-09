define(
  ['app'],
  function (app) {
    'use strict';

    app.run(
      [
        '$rootScope', '$location',
        function ($rootScope, $location) {

          angular.element('form').css({display: 'block'});

          $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //Debug.writeln(
            //  'Route change started! -- ',
            //  angular.toJson(event),
            //  ' -- ',
            //  angular.toJson(next),
            //  ' -- ',
            //  angular.toJson(current)
            //  );
          });

          $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            //Debug.writeln(
            //  'Route changed successfully! -- ',
            //  angular.toJson(event),
            //  ' -- ',
            //  angular.toJson(current),
            //  ' -- ',
            //  angular.toJson(previous)
            //  );
          });

          $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            //Debug.writeln(
            //  'Error: changing routes! -- ',
            //  angular.toJson(event),
            //  ' -- ',
            //  angular.toJson(current),
            //  ' -- ',
            //  angular.toJson(previous),
            //  ' -- ',
            //  angular.toJson(rejection)
            //  );
          });

        }
      ]
    );
  }
);