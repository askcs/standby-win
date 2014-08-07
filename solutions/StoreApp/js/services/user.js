define(
  ['services/services'],
  function (services) {
    'use strict';

    services.factory('User',
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
  }
);