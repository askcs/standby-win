'use strict';

StandByApp.controller('loginCtrl',
  function ($scope, $http, md5, StandBy) {

    $scope.loginData = {
      username: 'sbcengiz',
      password: 'askask'
    };

    $scope.login = function () {
      StandBy._('login', {
        uuid: $scope.loginData.username,
        pass: md5.createHash($scope.loginData.password)
      }).then(function (loggedIn) {
        if (loggedIn.error)
        {
          Debug.writeln('There was an error with your request!: ', loggedIn);
          return
        }

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