StandByApp.controller(
  'login',
  function ($scope, $location, Log, User)
  {
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
              $location.path('/dashboard');
            }
          }
        );
      }
    };

    angular.element('form').css({ display: 'block' });
  }
);