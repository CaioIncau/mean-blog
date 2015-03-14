angular.module('myblog').controller('HomeController',['$http','$scope', '$routeParams', '$resource',
  function($http,$scope, $routeParams, $resource) {
  	var Post = $resource('/posts/:id');
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

 	$http.get('/loggedin').success(function(user){
	        // Authenticated
			$scope.auth=false;

	        if (user !== '0'){
	          	$scope.auth=true;
	        }

		console.log("Auth ? "+$scope.auth)
	});

  	$scope.salva = function() {
  		console.log("rota de salvar");
		console.log($scope.post);
		$scope.post.$save();
	};
  
  Post.query(function(posts) {
      $scope.posts = posts;
   });
}]);