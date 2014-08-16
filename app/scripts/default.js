'use strict';

var StandByApp = angular.module('StandByApp', ['ngRoute', 'ngResource', 'ngSanitize', 'ngMd5']); // 'winjs'


StandByApp.constant(
  '$config', {
    host: 'http://dev.ask-cs.com',
    version: '0.0.1',
    released: '00-00-0000'
  }
);


StandByApp.config(
  [
    '$routeProvider',
    function ($routeProvider)
    {
      $routeProvider
        .when('/login', { templateUrl: 'views/login.html', controller: 'loginCtrl' })
        .when('/dashboard', { templateUrl: 'views/dashboard.html', controller: 'dashboardCtrl' })
        .otherwise({ redirectTo: '/login' });
    }
  ]
);


StandByApp.run(
  function ($rootScope, $location, $compile, $timeout, Log)
  {
    angular.element('form').css({ display: 'block' });

    $rootScope.$on(
      '$routeChangeStart',
      function (event, next, current)
      {
        Log.print('Route change started!', event, next, current);
      }
    );

    $rootScope.$on(
      '$routeChangeSuccess',
      function (event, current, previous)
      {
        Log.print('Route changed successfully!', event, current, previous);
      }
    );

    $rootScope.$on(
      '$routeChangeError',
      function (event, current, previous, rejection)
      {
        Log.print('Error: changing routes!', event, current, previous, rejection);
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