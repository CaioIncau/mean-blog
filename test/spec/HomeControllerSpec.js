describe("HomeController", function() {
	var $scope, $httpBackend;

	var assert = chai.assert;

	beforeEach(function() {
		module('myblog');
		inject(function($injector, _$httpBackend_){
			$scope = $injector.get('$rootScope').$new();
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET', '/posts/1')
                            .respond({_id: '1'});
			$httpBackend.when('GET', '/posts')
                            .respond([{}]);                           
		});
	});

	it("Deve criar um Post vazio quando nenhum parâmetro de rota for passado", 
		inject(function($controller) {
			$controller('HomeController', {
				'$scope': $scope
			});
			
			assert.isUndefined($scope.post._id, 'no id defined');


	}));

	it("Deve preencher o Post quando parâmetro de rota for passado", 
		inject(function($controller) {
			$controller('HomeController', {
				$routeParams: {postId: 1},
				'$scope': $scope
			});
			$httpBackend.when('GET', '/loggedin')
                            .respond('1');  
			$httpBackend.flush();
			assert.isDefined($scope.post._id, 'id defined');
	}));
	it("Deve estar logado", 
		inject(function($controller) {
			$controller('HomeController', {
				'$scope': $scope
			});
			$httpBackend.when('GET', '/loggedin')
                            .respond('1');  
			$httpBackend.flush();
			assert.isTrue($scope.auth, 'deslogado');
	}));
	it("Deve estar deslogado", 
		inject(function($controller) {
			$controller('HomeController', {
				'$scope': $scope
			});
			$httpBackend.when('GET', '/loggedin')
                            .respond('0'); 
			$httpBackend.flush();
			assert.isFalse($scope.auth, 'deslogado');
	}));




});