define(
  ['controllers/controllers'],
  function (controllers) {
    'use strict';

    controllers.controller('login',
      function ($scope, $http, StandBy) {

        $scope.login = function () {
          StandBy._('login', {
            uuid: $scope.login.username,
            pass: MD5.parse($scope.login.password)
          }).then(function (loggedIn) {
            $http.defaults.headers.common['X-SESSION_ID'] = loggedIn['X-SESSION_ID'];

            $scope.login.session = loggedIn['X-SESSION_ID'];

            StandBy._('resources')
            .then(function (resources) {
              if (resources) {
                $scope.resources = angular.toJson(resources);
              }
            })
          });

          $scope.login.status = true;
        }

      }
    );
  }
);