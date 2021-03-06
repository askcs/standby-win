﻿(function () {
  "use strict";

  var app = angular.module('app', ['ngResource']);

  app.factory(
    'User',
    function ($resource, $q) {
      var User = $resource(
        'http://dev.ask-cs.com' + '/login',
        {},
        {
          login: {
            method: 'GET',
            params: {
              uuid: '',
              pass: ''
            }
          }
        }
      );

      User.prototype.login = function (uuid, pass) {
        var deferred = $q.defer();

        User.login(
          {
            uuid: uuid,
            pass: pass
          },
          function (result) {
            if (angular.equals(result, [])) {
              deferred.reject("Something went wrong with login!");
            }
            else {
              deferred.resolve(result);
            }
          },
          function (error) { deferred.resolve(error) }
        );

        return deferred.promise;
      };

      return new User;
    }

  );

  app.controller(
    'loginCtrl',
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

})();