StandByApp.controller(
  'login',
  function ($rootScope, $scope, $location, $q, Log, Store, User, Environment, Network, Planboard)
  {
    $scope.view = 'login';

    $scope.data = {
      username: 'devcengiz',
      password: 'askask'
    };

    $scope.warning = {
      status: false,
      message: ''
    };

    $scope.authorize = function ()
    {
      if ($scope.data.username == '' || $scope.data.password == '')
      {
        $scope.warning = {
          status: true,
          message: 'Please do not left username or password empty!'
        };

        return false;
      }
      else
      {
        User.login($scope.data).then(
          function (result)
          {
            if (result.error && result.error.status)
            {
              $scope.warning = {
                status: true,
                message: (result.error.status == 400 ||
                          result.error.status == 403 ||
                          result.error.status == 404) ?
                         'Wrong username or password!' :
                         'There has been an error with your login!'
              };

              return false;
            }
            else
            {
              $scope.view = 'preloaded';

              $scope.preloaded = 'Loading user resources.';

              User.resources()
                .then(
                function (resources)
                {
                  $scope.preloaded = 'Setting up environment.';

                  Environment.setup()
                    .then(
                    function ()
                    {
                      $scope.preloaded = 'Getting groups list.';

                      Network.groups()
                        .then(
                        function ()
                        {
                          $scope.preloaded = 'Populating group members.';

                          Network.population()
                            .then(
                            function ()
                            {
                              $scope.preloaded = 'Getting calculating group availability overviews.';

                              Planboard.clusters()
                                .then(
                                function ()
                                {
                                  $scope.preloaded = 'Getting user availability.';

                                  Planboard.availability(resources.uuid)
                                    .then(
                                    function ()
                                    {
                                      $scope.preloaded = 'Getting member availabilities.';

                                      Planboard.availabilities()
                                        .then(
                                        function () { $location.path('/dashboard')}
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          }
        );
      }
    };


    $scope.logout = function ()
    {
      // $scope.view = 'logout';

      _.each(
        ['user', 'environment', 'network', 'planboard'],
        function (table) { Store(table).nuke() }
      );

      User.logout()
        .then(
        function ()
        {
          $location.path('/login');

          // $scope.view = 'login';
        }
      );
    };
  }
);