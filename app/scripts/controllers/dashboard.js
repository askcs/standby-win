StandByApp.controller(
  'dashboard',
  function ($scope, $q, $timeout, $location, Session, Store, Planboard)
  {
    if (! Session.check())
    {
      $location.path('/login');
      return;
    }

    $scope.data = {
      groups: {}
    };

    _.each(
      Store('network').get('groups'),
      function (group)
      {
        var availabilities = function (members)
        {
          _.each(
            members,
            function (member) { return _.assign(member, { availability:  Planboard.current(member.uuid) }) }
          );

          return members;
        };

        $scope.data.groups[group.uuid] = {
          name: group.name,
          loading: true,
          members: availabilities(Store('network').get('group.' + group.uuid))
        };
      }
    );

    $scope.isEmptyPlanning = function (availability) { return ! _.isUndefined(availability.start) }
  }
);