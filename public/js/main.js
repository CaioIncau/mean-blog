angular.module('myblog', ['ngRoute', 'ngResource','ngSanitize'])
	.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider) {

  


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          deferred.resolve();

        // Not Authenticated
        else {
  
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

  $routeProvider.when('/blog/:pageNumber', {
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

}]);