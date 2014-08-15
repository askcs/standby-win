'use strict';

var StandByApp = angular.module('StandByApp', ['ngResource', 'ngSanitize', 'winjs', 'ngMd5']);

StandByApp.run(function ($rootScope, $location, $compile, $timeout) {
  angular.element('form').css({ display: 'block' });

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    Debug.writeln('Route change started! -- ', angular.toJson(event), ' -- ', angular.toJson(next), ' -- ', angular.toJson(current));
  });

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    Debug.writeln('Route changed successfully! -- ', angular.toJson(event), ' -- ', angular.toJson(current), ' -- ', angular.toJson(previous));
  });

  $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
    Debug.writeln('Error: changing routes! -- ', angular.toJson(event), ' -- ', angular.toJson(current), ' -- ', angular.toJson(previous), ' -- ', angular.toJson(rejection));
  });

  WinJS.Binding.optimizeBindingReferences = true;

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;

  app.addEventListener("activated", function (args) {    

    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        Debug.writeln('App is initialized!');
      } else {
        Debug.writeln('App is has been reactivated from suspension!');
      }

      args.setPromise(WinJS.UI.processAll().then(function () { 
        Debug.writeln('All UI processers are done!');
      }));
    }
  });

  app.oncheckpoint = function (args) {
    Debug.writeln('App is saving data on checkpoint!');
  };

  app.start();
});