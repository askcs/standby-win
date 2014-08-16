StandByApp.factory(
  'User',
  function ($resource, $q, $config, $http, Log, md5, StandBy, Session)
  {
    var User = $resource();

    User.prototype.login = function (credentials)
    {
      var deferred = $q.defer();

      try
      {
        StandBy._(
          'login', {
            uuid: credentials.username.toLowerCase(),
            pass: md5.createHash(credentials.password)
          }).then(
          function (result)
          {
            if (! result.error)
            {
              Session.set(result['X-SESSION_ID']);
            }

            deferred.resolve(result);
          }
        );
      }
      catch (err)
      {
        Log.error('Something went wrong with login call:', err);
      }

      return deferred.promise;
    };

    return new User();
  });