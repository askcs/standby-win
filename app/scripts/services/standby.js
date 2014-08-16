StandByApp.factory(
  'StandBy',
  function ($resource, $q, $location, $rootScope, $config, Log)
  {
    var StandBy = $resource(
        $config.host + '/:first/:second/:third/:fourth',
        {},
        {
          login: {
            method: 'GET',
            params: { first: 'login', uuid: '', pass: '' }
          },
          logout: {
            method: 'GET',
            params: { first: 'logout' },
            isArray: true
          },
          resources: {
            method: 'GET',
            params: { first: 'resources' }
          }
        }
    );

    StandBy.prototype._ = function (proxy, params, data, callback)
    {
      var deferred = $q.defer();

      params = params || {};

      try
      {
        StandBy[proxy](
          params,
          data,
          function (result)
          {
            ((callback && callback.success)) && callback.success.call(this, result);

            // Log.print('Call:', proxy, 'params: ', params, 'data load:', data, 'result: ', result);

            deferred.resolve(result);
          },
          function (result)
          {
            ((callback && callback.error)) && callback.error.call(this, result);

            Log.error('Error with call:', proxy, 'params: ', params, 'data load:', data, 'result: ', result);

            deferred.resolve({ error: result });
          }
        );
      }
      catch (e)
      {
        Log.error('Error with making call:', e);
      }

      return deferred.promise;
    };

    return new StandBy();
  });