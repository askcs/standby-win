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

          sessionStorage.setItem(
            'session',
            angular.toJson({ id: id, time: new Date() })
          );
        },

        clear: function ()
        {
          sessionStorage.removeItem("session");

          this.header = null;
        }
      };
    }
  ]
);