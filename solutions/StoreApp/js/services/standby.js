define(
  ['services/services', 'config'],
  function (services, config) {
    'use strict';

    services.factory(
      'StandBy',
      [
        '$resource', '$q', '$location', '$rootScope',
        function ($resource, $q, $location, $rootScope) {
          var StandBy = $resource(
              config.app.host + '/:first/:second/:third/:fourth',
              {},
              {
                login: {
                  method: 'GET',
                  params: {
                    first: 'login',
                    uuid: '',
                    pass: ''
                  }
                },
                logout: {
                  method: 'GET',
                  isArray: true,
                  params: {
                    first: 'logout'
                  }
                },
                resources: {
                  method: 'GET',
                  params: {
                    first: 'resources'
                  }
                }

              }
          );

          StandBy.prototype._ = function (proxy, params, data, callback) {
            var deferred = $q.defer();

            params = params || {};

            try {
              StandBy[proxy](
                params,
                data,
                function (result) {
                  ((callback && callback.success)) && callback.success.call(this, result);

                  deferred.resolve(result);
                },
                function (result) {
                  ((callback && callback.error)) && callback.error.call(this, result);

                  deferred.resolve({ error: result });
                }
              );
            }
            catch (err) {
              // Log.error(err)               
            }

            return deferred.promise;
          };

          return new StandBy();
        }
      ]
    );
  }
);