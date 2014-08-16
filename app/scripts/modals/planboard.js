StandByApp.factory(
  'Planboard',
  function ($resource, $q, Log, StandBy, Store)
  {
    var Planboard = $resource();

    var periods = function ()
    {
      var now = new Date();

      return {
        start: Math.floor(
            new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              0, 0, 0) / 1000),
        end: Math.floor(
            new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + 7,
              0, 0, 0) / 1000)
      }
    };

    Planboard.prototype.availability = function (userID)
    {
      var deferred = $q.defer();

      try
      {
        StandBy._(
          'availability',
          {
            second: userID,
            start: periods().start,
            end: periods().end
          }
        ).then(
          function (result)
          {
            Store('planboard').save('availability.' + userID, result);

            deferred.resolve(result);
          }
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with getting the availability call for:', userID, e);
      }

      return deferred.promise;
    };

    Planboard.prototype.availabilities = function ()
    {
      var deferred = $q.defer(),
          calls = [],
          availabilities = {};

      try
      {
        _.each(
          Store('network').get('unique'),
          function (member)
          {
            calls.push(
              StandBy._(
                'availability',
                {
                  second: member.uuid,
                  start: periods().start,
                  end: periods().end
                }
              ).then(
                function (results)
                {
                  Store('planboard').save('member.' + member.uuid, results);

                  availabilities[member.uuid] = results;
                }
              )
            );
          }
        );

        $q.all(calls)
          .then(
          function ()
          {
            Store('planboard').save('availabilities', availabilities);

            deferred.resolve(availabilities);
          }.bind(availabilities)
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with getting member availabilities call:', e);
      }

      return deferred.promise;
    };

    Planboard.prototype.cluster = function (groupID)
    {
      var deferred = $q.defer();

      try
      {
        StandBy._(
          'cluster',
          {
            second: groupID,
            start: periods().start,
            end: periods().end
          }
        ).then(
          function (result)
          {
            Store('planboard').save('cluster.' + groupID, result);

            deferred.resolve(result);
          }
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with getting clusters call for group:', groupID, e);
      }

      return deferred.promise;
    };

    Planboard.prototype.clusters = function ()
    {
      var deferred = $q.defer(),
          calls = [],
          clusters = {};

      try
      {
        _.each(
          Store('network').get('groups'),
          function (group)
          {
            calls.push(
              StandBy._(
                'cluster',
                {
                  second: group.uuid,
                  start: periods().start,
                  end: periods().end
                }
              ).then(
                function (results)
                {
                  Store('planboard').save('cluster.' + group.uuid, results);

                  clusters[group.uuid] = results;
                }
              )
            );
          }
        );

        $q.all(calls)
          .then(
          function ()
          {
            Store('planboard').save('clusters', clusters);

            deferred.resolve(clusters);
          }.bind(clusters)
        );
      }
      catch (e)
      {
        Log.error('Something went wrong with getting group clusters call:', e);
      }

      return deferred.promise;
    };


    return new Planboard();
  });