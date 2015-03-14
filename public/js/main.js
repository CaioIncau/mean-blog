angular.module('myblog', ['ngRoute', 'ngResource','ngSanitize'])
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
      templateUrl: 'partials/blog.html',
      controller: 'HomeController'
    });

    $routeProvider.when('/post', {
    	templateUrl: 'partials/formPost.html', 
    	resolve: {
          loggedin: checkLoggedin
        },
      controller: 'HomeController'
    });

    $routeProvider.when('/post/:postId', {
      templateUrl: 'partials/formPost.html', 
      resolve: {
          loggedin: checkLoggedin
        },
      controller: 'HomeController'
    });

    $routeProvider.when('/', {
      templateUrl: 'partials/about.html',
      controller: 'HomeController'
    });
    $routeProvider.when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'HomeController'
    });
    $routeProvider.when('/work', {
      templateUrl: 'partials/work.html',
      controller: 'HomeController'
    });
    $routeProvider.when('/skills', {
      templateUrl: 'partials/skills.html',
      controller: 'HomeController'
    });
     $routeProvider.when('/contato', {
      templateUrl: 'partials/contato.html',
      controller: 'HomeController'
    });

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'HomeController'
    });

});