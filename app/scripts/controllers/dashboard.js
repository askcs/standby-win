StandByApp.controller(
  'dashboard',
  function ($scope, $q, $timeout, $location, Session, Log, Store)
  {
    if (! Session.check())
    {
      $location.path('/login');
      return;
    }

    $scope.data = {
      groups: {}
    };

    var groups = Store('network').get('groups');

    _.each(
      groups,
      function (group)
      {
        var availabilities = function (members)
        {
          _.each(
            members,
            function (member)
            {
              member.availability = Store('planboard').get('member.' + member.uuid)[0] || 'No availability';

              return member;
            }
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
  }
);