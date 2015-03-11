angular.module('myblog', ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $httpProvider) {

     $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/');
        }
      });

      return deferred.promise;
    };


    $routeProvider.when('/blog', {
      templateUrl: 'partials/blog.ejs',
      resolve: {
          loggedin: checkLoggedin
        },
      controller: 'HomeController'
    });
    $routeProvider.when('/', {
      templateUrl: 'partials/about.ejs',
      controller: 'HomeController'
    });
    $routeProvider.when('/about', {
      templateUrl: 'partials/about.ejs',
      controller: 'HomeController'
    });
    $routeProvider.when('/work', {
      templateUrl: 'partials/work.ejs',
      controller: 'HomeController'
    });
    $routeProvider.when('/skills', {
      templateUrl: 'partials/skills.ejs',
      controller: 'HomeController'
    });
     $routeProvider.when('/contato', {
      templateUrl: 'partials/contato.ejs',
      controller: 'HomeController'
    });

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.ejs',
      controller: 'HomeController'
    });

});