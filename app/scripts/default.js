'use strict';

var StandByApp = angular.module('StandByApp', ['ngRoute', 'ngResource', 'ngSanitize', 'winjs', 'ngMd5']);

StandByApp.constant('$config', {
  host: 'http://dev.ask-cs.com',
  version: '0.0.1',
  released: '00-00-0000'
});

StandByApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', { templateUrl: 'views/login.html', controller: 'loginCtrl' })
    .when('/dashboard', { templateUrl: 'views/dashboard.html', controller: 'dashboardCtrl' })
    .otherwise({ redirectTo: '/login' });
}
]);

StandByApp.run(function ($rootScope, $location, $compile, $timeout) {
  angular.element('form').css({ display: 'block' });

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // Debug.writeln('Route change started! -- ', angular.toJson(event), ' -- ', angular.toJson(next), ' -- ', angular.toJson(current));
  });

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    // Debug.writeln('Route changed successfully! -- ', angular.toJson(event), ' -- ', angular.toJson(current), ' -- ', angular.toJson(previous));
  });

  $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
    // Debug.writeln('Error: changing routes! -- ', angular.toJson(event), ' -- ', angular.toJson(current), ' -- ', angular.toJson(previous), ' -- ', angular.toJson(rejection));
  });

  WinJS.Binding.optimizeBindingReferences = true;

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;

  app.addEventListener("activated", function (args) {

    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        // Debug.writeln('App is initialized!');
      } else {
        // Debug.writeln('App is has been reactivated from suspension!');
      }

      args.setPromise(WinJS.UI.processAll().then(function () {
        // Debug.writeln('All UI processers are done!');
      }));
    }
  });

  app.oncheckpoint = function (args) {
    // Debug.writeln('App is saving data on checkpoint!');
  };

  app.start();
});

StandByApp.factory('StandBy', function ($resource, $q, $location, $rootScope, $config) {
  var StandBy = $resource(
      $config.host + '/:first/:second/:third/:fourth',
      {},
      {
        login: {
          method: 'GET',
          params: {first: 'login', uuid: '', pass: ''}
        },
        logout: {
          method: 'GET',
          isArray: true,
          params: {first: 'logout'}
        },
        resources: {
          method: 'GET',
          params: {first: 'resources'}
        }
      }
  );

  StandBy.prototype._ = function (proxy, params, data, callback) {
    var deferred = $q.defer();

    params = params || {};

    try {
      StandBy[proxy](
        params,
        data,
        function (result) {
          ((callback && callback.success)) && callback.success.call(this, result);

          deferred.resolve(result);
        },
        function (result) {
          ((callback && callback.error)) && callback.error.call(this, result);

          deferred.resolve({ error: result });
        }
      );
    }
    catch (err) {
      // Log.error(err)               
    }

    return deferred.promise;
  };

  return new StandBy();
});

StandByApp.controller('loginCtrl', function ($scope, $http, md5, StandBy) {

  $scope.data = {
    username: 'devcengiz',
    password: 'askask'
  };

  $scope.login = function () {
    StandBy._('login', {
      uuid: $scope.data.username,
      pass: md5.createHash($scope.data.password)
    }).then(function (result) {
      if (result.error) {
        Debug.writeln('There was an error with your request!: ', result);
        return
      }

      $http.defaults.headers.common['X-SESSION_ID'] = result['X-SESSION_ID'];

      $scope.data.session = result['X-SESSION_ID'];

      StandBy._('resources')
      .then(function (resources) {
        if (resources) {
          $scope.resources = angular.toJson(resources);
        }
      })
    });
  }
});

StandByApp.controller('dashboardCtrl', function ($scope, StandBy) {

  $scope.data = {
    groups: ['group1', 'group2', 'group3']
  };
});