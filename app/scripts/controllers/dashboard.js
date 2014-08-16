StandByApp.controller(
  'dashboard',
  function ($scope, $q, $timeout, $location, Session, Log, Store, Network)
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
        $scope.data.groups[group.uuid] = {
          name: group.name,
          loading: true,
          members: []
        };
      }
    );

    // Load member availabilities
    // Load calc_plannings
    // Load user availability
  }
);