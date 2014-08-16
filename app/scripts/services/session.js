StandByApp.factory(
  'Session', [
    '$rootScope', '$http', '$location',
    function ($rootScope, $http, $location)
    {
      return {
        check: function ()
        {
          if (! this.get())
          {
            $location.path("/login");

            return false;
          }
          else
          {
            return true;
          }
        },
        get: function ()
        {
          var session;

          session = angular.fromJson(sessionStorage.getItem("session"));

          if (! $http.defaults.headers.common["X-SESSION_ID"] && session)
          {
            $http.defaults.headers.common["X-SESSION_ID"] = session.id;
          }

          return (session) ? session.id : false;
        },
        set: function (id)
        {
          $http.defaults.headers.common["X-SESSION_ID"] = id;

          sessionStorage.setItem(
            "session",
            angular.toJson(
              {
                id: id,
                time: new Date()
              }
            )
          );
        },
        clear: function ()
        {
          sessionStorage.removeItem("session");
          $http.defaults.headers.common["X-SESSION_ID"] = null;
        }
      };
    }
  ]);