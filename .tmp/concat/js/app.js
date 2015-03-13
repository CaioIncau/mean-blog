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
angular.module('myblog').controller('HomeController',['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
  	var Post = $resource('/posts/:id');


  	if($routeParams.PostId) {
	  	Post.get({id: $routeParams.postId},
	    function(post) {
		    $scope.post = post;
		},
		function(erro) {
		    $scope.mensagem = {
		        texto: 'Não foi possível obter o Post.'
		    };
		    console.log(erro);
		});
	    console.log($routeParams.PostId);
	}else{
		$scope.post = new Post();
	}


  	$scope.salva = function() {
		console.log($scope.post)
		$scope.post.$save();
	};
  
  Post.query(function(posts) {
      $scope.posts = posts;
   });
}]);
angular.module('myblog').controller('LoginController',['$scope', '$rootScope', '$http', '$location',
 function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/blog');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
}]);