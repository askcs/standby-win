(function () {
  "use strict";

  WinJS.Binding.optimizeBindingReferences = true;

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;

  app.onactivated = function (args) {
    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        // TODO: This application has been newly launched. Initialize
        // your application here.

        // Initialize
        require(["init"]);

      } else {
        // TODO: This application has been reactivated from suspension.
        // Restore application state here.

        // Restoring from suspension
        require(["restore"]);

      }
      args.setPromise(WinJS.UI.processAll());
    }
  };

  app.oncheckpoint = function (args) {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. You might use the
    // WinJS.Application.sessionState object, which is automatically
    // saved and restored across suspension. If you need to complete an
    // asynchronous operation before your application is suspended, call
    // args.setPromise().

    // About to be suspended. 
    require("suspend");
  };




  // require('init')        


  "use strict";

  var StandBy = angular.module('app', ['ngResource', 'winjs']);

  StandBy.factory(
    'User',
    function ($resource, $q) {
      var User = $resource(
        'http://dev.ask-cs.com' + '/login',
        {},
        {
          login: {
            method: 'GET',
            params: {
              uuid: '',
              pass: ''
            }
          }
        }
      );

      User.prototype.login = function (uuid, pass) {
        var deferred = $q.defer();

        User.login(
          {
            uuid: uuid,
            pass: pass
          },
          function (result) {
            if (angular.equals(result, [])) {
              deferred.reject("Something went wrong with login!");
            }
            else {
              deferred.resolve(result);
            }
          },
          function (error) { deferred.resolve(error) }
        );

        return deferred.promise;
      };

      return new User;
    }
  );

  StandBy.controller(
    'loginCtrl',
    function ($scope, $http, User) {
      $scope.login = function () {
        Debug.writeln('login has been asked for -> ', $scope.login.username, ' : ', $scope.login.password);

        User.login(
          'devcengiz',
          'eadeb77d8fba90b42b32b7de13e8aaa6'
        ).then(
          function (loggedIn) {
            $http.defaults.headers.common['X-SESSION_ID'] = loggedIn['X-SESSION_ID'];

            $scope.login.session = loggedIn['X-SESSION_ID'];
          }
        );

        $scope.login.status = true;
      }
    }
  );





  app.start();
})();