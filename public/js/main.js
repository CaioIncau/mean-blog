angular.module('myblog', ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $httpProvider) {


    $routeProvider.when('/blog', {
      templateUrl: 'partials/blog.ejs',
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

});