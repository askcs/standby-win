'use strict';

var StandByApp = angular.module(
  'StandByApp',
  [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngMd5'
  ]
); // 'winjs'


StandByApp.constant(
  '$config',
  {
    host: 'http://dev.ask-cs.com',
    version: '0.0.1',
    released: '00-00-0000'
  }
);


StandByApp.config(
  function ($routeProvider, $httpProvider)
  {
    $routeProvider
      .when(
      '/login',
      {
        templateUrl: 'views/login.html',
        controller: 'login'
      })
      .when(
      '/dashboard',
      {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboard'
      })
      .otherwise(
      {
        redirectTo: '/login'
      });

    $httpProvider.interceptors.push(
      function ($q, Log)
      {
        return {
          request: function (config) { return config || $q.when(config) },

          requestError: function (rejection)
          {
            Log.error('Request error:', rejection);

            return $q.reject(rejection);
          },

          response: function (response) { return response || $q.when(response) },

          responseError: function (rejection)
          {
            Log.error('Response error:', rejection);

            if (rejection.status == 403)
            {
              // Do something about not authorized calls
            }

            return $q.reject(rejection);
          }
        };
      }
    );
  }
);


StandByApp.run(
  function ($rootScope, $config, $location, Log, Session, Offline, User)
  {
    Session.check();

    $rootScope.app = $rootScope.app || {};

    $rootScope.config = $config;

    new Offline();

    $rootScope.$on(
      'connection',
      function ()
      {
        Log.print(
          (! arguments[1]) ?
          'connection restored :]' + Date.now() :
          'connection lost :[' + Date.now()
        );
      }
    );

    $rootScope.logout = function ()
    {
      User.logout()
        .then(
        function () { $location.path('/login') }
      );
    };

    $rootScope.$on(
      '$routeChangeStart',
      function (event, next, current)
      {
        // Log.print('Route change started!', event, next, current);
      }
    );

    $rootScope.$on(
      '$routeChangeSuccess',
      function (event, current, previous)
      {
        // Log.print('Route changed successfully!', event, current, previous);
      }
    );

    $rootScope.$on(
      '$routeChangeError',
      function (event, current, previous, rejection)
      {
        // Log.print('Error: changing routes!', event, current, previous, rejection);
      }
    );

    //    WinJS.Binding.optimizeBindingReferences = true;
    //
    //    var app = WinJS.Application;
    //    var activation = Windows.ApplicationModel.Activation;
    //
    //    app.addEventListener(
    //      'activated',
    //      function (args)
    //      {
    //        if (args.detail.kind === activation.ActivationKind.launch)
    //        {
    //          if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated)
    //          {
    //            Log.print('App is initialized!');
    //          }
    //          else
    //          {
    //            Log.print('App is has been reactivated from suspension!');
    //          }
    //
    //          args.setPromise(
    //            WinJS.UI.processAll()
    //              .then(
    //              function () { Log.print('All UI processes are done!') }
    //            )
    //          );
    //        }
    //      }
    //    );
    //
    //    app.oncheckpoint = function (args) { Log.print('App is saving data on checkpoint!') };
    //
    //    app.start();
  }
);