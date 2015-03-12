angular.module('myblog').controller('HomeController',
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
});