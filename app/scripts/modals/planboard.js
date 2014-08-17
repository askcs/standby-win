StandByApp.factory(
  'Planboard',
  function ($rootScope, $resource, $q, $filter, Log, StandBy, Store)
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

    var normalize = function (periods)
    {
      var stamped = function (period)
      {
        var stamp;

        _.each(
          ['start', 'end'],
          function (part)
          {
            if (! _.isUndefined(period[part]))
            {
              stamp = Math.floor(period[part] * 1000);

              period[part] = {
                _stamp: period[part],
                stamp: stamp,
                short: $filter('date')(stamp, 'short'),
                fullDate: $filter('date')(stamp, 'fullDate')
              };
            }
          }
        );
      };

      if (_.isArray(periods))
      {
        _.each(periods, function (period) { stamped(period) });
      }
      else
      {
        _.each(
          periods,
          function (_periods) { _.each(_periods, function (period) { stamped(period) }) }
        );
      }

      return periods;
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
            normalize(result);

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
          availabilities = {},
          unique = Store('network').get('unique');

      $rootScope.missioned(unique.length);

      try
      {
        _.each(
          unique,
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
                  $rootScope.ticked();

                  normalize(results);

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

    Planboard.prototype.current = function (memberID)
    {
      var planning = Store('planboard').get('member.' + memberID);

      var current;

      if (_.isUndefined(planning[0]))
      {
        current = { text: 'Empty planning.' }
      }
      else{
        var now = Date.now();

        if (planning[0].start.stamp <= now && planning[0].end.stamp >= now)
        {
          current = planning[0];
        }
        else
        {
          current = { text: 'There is no availability for the moment planned for this user.' }
        }
      }

      return current;
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
            normalize(result);

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
          clusters = {},
          groups = Store('network').get('groups');

      $rootScope.missioned(groups.length);

      try
      {
        _.each(
          groups,
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
                  $rootScope.ticked();

                  normalize(results);

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