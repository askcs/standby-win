StandByApp.factory(
  'Session', [
    '$rootScope', '$http',
    function ($rootScope, $http)
    {
      return {
        header: $http.defaults.headers.common["X-SESSION_ID"],

        check: function () { return ((this.get())) },

        get: function ()
        {
          var session = angular.fromJson(sessionStorage.getItem("session"));

          if (! this.header && session)
          {
            this.header = session.id;
          }

          return (session) ? session.id : false;
        },

        set: function (id)
        {
          this.header = id;

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

          this.header = null;
        }
      };
    }
  ]
);