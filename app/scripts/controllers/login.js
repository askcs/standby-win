define(
  ['controllers/controllers'],
  function (controllers) {
    'use strict';

    controllers.controller('login',
      function ($scope, $http, StandBy) {

        $scope.loginData = {
          username: 'sbcengiz',
          password: 'askask'
        };

        $scope.login = function () {
          StandBy._('login', {
            uuid: $scope.loginData.username,
            pass: MD5.parse($scope.loginData.password)
          }).then(function (loggedIn) {
            $http.defaults.headers.common['X-SESSION_ID'] = loggedIn['X-SESSION_ID'];

            $scope.loginData.session = loggedIn['X-SESSION_ID'];

            StandBy._('resources')
            .then(function (resources) {
              if (resources) {
                $scope.resources = angular.toJson(resources);
              }
            })
          });
        }

      }
    );
  }
);