angular.module('myblog').controller('HomeController',['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
  	var Post = $resource('/posts/:id');
  	console.log("id"+ $routeParams.postId);
  	if($routeParams.postId) {
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
	}else{
		$scope.post = new Post();
	}


  	$scope.salva = function() {
  		console.log("rota de salvar");
		console.log($scope.post);
		$scope.post.$save();
	};
  
  Post.query(function(posts) {
      $scope.posts = posts;
   });
}]);