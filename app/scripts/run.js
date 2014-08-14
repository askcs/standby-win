'use strict';

StandByApp.run(function ($rootScope, $location, $compile, $timeout) {
  angular.element('form').css({ display: 'block' });

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    //Debug.writeln(
    //  'Route change started! -- ',
    //  angular.toJson(event),
    //  ' -- ',
    //  angular.toJson(next),
    //  ' -- ',
    //  angular.toJson(current)
    //  );
  });

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    //Debug.writeln(
    //  'Route changed successfully! -- ',
    //  angular.toJson(event),
    //  ' -- ',
    //  angular.toJson(current),
    //  ' -- ',
    //  angular.toJson(previous)
    //  );
  });

  $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
    //Debug.writeln(
    //  'Error: changing routes! -- ',
    //  angular.toJson(event),
    //  ' -- ',
    //  angular.toJson(current),
    //  ' -- ',
    //  angular.toJson(previous),
    //  ' -- ',
    //  angular.toJson(rejection)
    //  );
  });

  WinJS.Binding.optimizeBindingReferences = true;

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  var nav = WinJS.Navigation;

  app.addEventListener("activated", function (args) {
    

    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        // TODO: This application has been newly launched. Initialize
        // your application here.

        Debug.writeln('App is gonna start for the first time!');
      } else {
        // TODO: This application has been reactivated from suspension.
        // Restore application state here.

        Debug.writeln('App is resumed!');
      }



      if (app.sessionState.history) {
        nav.history = app.sessionState.history;
      }
      args.setPromise(WinJS.UI.processAll().then(function () {

        
        if (nav.location) {
          nav.history.current.initialPlaceholder = true;
          return nav.navigate(nav.location, nav.state);
        } else {
          return nav.navigate(Application.navigator.home);
        }
        


        $rootScope.navigateTo = function () {
          
        }


      }));
    }

    //Application.navigator.addEventListener('pageLoaded', function (arg) {
    //    args = arg.detail;
    $rootScope.$on('ready', function (evt, args) {
      $timeout(function () {
        $rootScope.navOptions = args.options || {};
        $compile(args.element)($rootScope);
      })
    });
  });

  app.oncheckpoint = function (args) {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. If you need to 
    // complete an asynchronous operation before your application is 
    // suspended, call args.setPromise().
    app.sessionState.history = nav.history;

    Debug.writeln('Saving data on checkpoint');
  };




  app.start();
});