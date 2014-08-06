define(
  ['controllers/controllers', 'services/user'],
  function (controllers)
  {
    'use strict';

    controllers.controller ('partial',
      [
        '$scope', 'User',
        function ($scope, User)
        {
          $scope.name = User.get();
        }
      ]
    );
  }
);