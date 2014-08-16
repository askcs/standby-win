StandByApp.factory(
  'Session', [
    '$rootScope', '$http',
    function ($rootScope, $http)
    {
      return {
        check: function () { return ((this.get())) },

        get: function ()
        {
          var session = angular.fromJson(sessionStorage.getItem("session"));

          if (! $http.defaults.headers.common["X-SESSION_ID"] && session)
          {
            $http.defaults.headers.common["X-SESSION_ID"] = session.id;
          }

          return (session) ? session.id : false;
        },

        set: function (id)
        {
          $http.defaults.headers.common["X-SESSION_ID"] = id;

          var session = {
            id: id,
            time: new Date()
          };

          sessionStorage.setItem(
            'session',
            angular.toJson(session)
          );

          $rootScope.app.session = session;
        },

        clear: function ()
        {
          sessionStorage.removeItem("session");

          delete $rootScope.app.session;

          $http.defaults.headers.common["X-SESSION_ID"] = null;
        }
      };
    }
  ]
);