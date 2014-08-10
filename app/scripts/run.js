define(
  ['app'],
  function (app) {
    'use strict';

    app.run(
      [
        '$rootScope', '$location',
        function ($rootScope, $location) {

          angular.element('form').css({display: 'block'});

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

          app.onactivated = function (args) {
            if (args.detail.kind === activation.ActivationKind.launch) {
              if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                Debug.writeln('Application newly launched, initialized!');
              } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.

                Debug.writeln('Application gets restored just now!');
              }
              args.setPromise(WinJS.UI.processAll().then(function () {
                Debug.writeln('UI processes are done!');
              }));
            }
          };

          app.oncheckpoint = function (args) {
            // TODO: This application is about to be suspended. Save any state
            // that needs to persist across suspensions here. You might use the
            // WinJS.Application.sessionState object, which is automatically
            // saved and restored across suspension. If you need to complete an
            // asynchronous operation before your application is suspended, call
            // args.setPromise().

            Debug.writeln('This is a checkpoint which can be used for saving any state!');
          };

          app.start();

        }
      ]
    );
  }
);