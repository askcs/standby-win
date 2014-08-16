StandByApp.controller(
  'loginCtrl',
  function ($scope, Log, User)
  {
    $scope.data = {
      username: '',
      password: ''
    };

    $scope.warning = {
      status: false,
      message: ''
    };

    $scope.login = function ()
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
              Log.write('Successfully logged id! ' + angular.toJson(result));
            }
          }
        );
      }
    }
  }
);