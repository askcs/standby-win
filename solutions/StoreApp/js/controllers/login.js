define(
  ['controllers/controllers'],
  function (controllers) {
    'use strict';

    controllers.controller('login',
      function ($scope, $http, User) {

        $scope.login = function () {
          Debug.writeln('login has been asked for -> ', $scope.login.username, ' : ', $scope.login.password);

          User.login(
            'devcengiz',
            'eadeb77d8fba90b42b32b7de13e8aaa6'
          ).then(
            function (loggedIn) {
              $http.defaults.headers.common['X-SESSION_ID'] = loggedIn['X-SESSION_ID'];

              $scope.login.session = loggedIn['X-SESSION_ID'];
            }
          );

          $scope.login.status = true;
        }

      }
    );
  }
);