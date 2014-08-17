StandByApp.factory(
  'Environment',
  function ($rootScope, $resource, $q, Log, StandBy, Store)
  {
    var Environment = $resource();

    Environment.prototype.domain = function ()
    {
      var deferred = $q.defer();

      try
      {
        StandBy._('domain').then(
          function (result)
          {
            Store('environment').save('domain', result);

            $rootScope.app.environment.domain = result;

            deferred.resolve(result);
          }
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with environment domain call:', e);
      }

      return deferred.promise;
    };

    Environment.prototype.states = function ()
    {
      var deferred = $q.defer();

      try
      {
        StandBy._('states').then(
          function (result)
          {
            Store('environment').save('states', result);

            $rootScope.app.environment.states = result;

            deferred.resolve(result);
          }
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with environment states call:', e);
      }

      return deferred.promise;
    };

    Environment.prototype.divisions = function ()
    {
      var deferred = $q.defer();

      try
      {
        StandBy._('divisions').then(
          function (result)
          {
            Store('environment').save('divisions', result);

            $rootScope.app.environment.divisions = result;

            deferred.resolve(result);
          }
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with environment divisions call:', e);
      }

      return deferred.promise;
    };

    return new Environment();
  });