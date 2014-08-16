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
        // Log.write('Route change started! -- ' + angular.toJson(event) + ' -- ' + angular.toJson(next) + ' -- ' + angular.toJson(current));
      });

    $rootScope.$on(
      '$routeChangeSuccess',
      function (event, current, previous)
      {
        // Log.write('Route changed successfully! -- ' + angular.toJson(event) + ' -- ' + angular.toJson(current) + ' -- ' + angular.toJson(previous));
      });

    $rootScope.$on(
      '$routeChangeError',
      function (event, current, previous, rejection)
      {
        // Log.write('Error: changing routes! -- ' + angular.toJson(event) + ' -- ' + angular.toJson(current) + ' -- ' + angular.toJson(previous) + ' -- ' + angular.toJson(rejection));
      });

    //  WinJS.Binding.optimizeBindingReferences = true;
    //
    //  var app = WinJS.Application;
    //  var activation = Windows.ApplicationModel.Activation;
    //
    //  app.addEventListener("activated", function (args) {
    //
    //    if (args.detail.kind === activation.ActivationKind.launch) {
    //      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
    //        // console.log('App is initialized!');
    //      } else {
    //        // console.log('App is has been reactivated from suspension!');
    //      }
    //
    //      args.setPromise(WinJS.UI.processAll().then(function () {
    //        // console.log('All UI processers are done!');
    //      }));
    //    }
    //  });
    //
    //  app.oncheckpoint = function (args) {
    //    // console.log('App is saving data on checkpoint!');
    //  };
    //
    //  app.start();
  }
);