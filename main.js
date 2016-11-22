var app = angular.module("app", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		//.when("/", {
		//	templateUrl: "template.html",
		//	controller: "controller"
		//})
		.otherwise({
			templateUrl: "template.html",
			controller: "controller"
		});

	$locationProvider.html5Mode(true);
});

app.controller("controller", function($scope, $http, $route, $location) {
	var loc = $location.url();
	if(loc == "/") {
		window.location = "/todo/" + randomString(6);
		loc = $location.url();
	}
	var api = "api.php?file=" + loc.replace("/", "");

	$scope.todos = [];

	$http.get(api).then(function(response){
		$scope.todos = response.data;
	});

	$scope.$watch('todos', function(){
		// $scope.save();
	}, true);

	$scope.addTodo = function(){
		$scope.todos.push({});
	}

	$scope.remove = function(index){
		$scope.todos.splice(index, 1);
	}

	$scope.save = function(){
		$http({
			method: 'POST', 
			url: api, 
			data: $scope.todos, 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function(response){
				$scope.show = true;
				setTimeout(function(){$scope.show = false;}, 0);
			});
	}

	function randomLetter() {
		// 0 or 1
		if(Math.floor(Math.random()*2)){
			// Random capital letter
			return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
		}
		// Random lower-case letter
		return String.fromCharCode(Math.floor((Math.random() * 26) + 97));
	}

	function randomString(length) {
		var str = "";
		for (var i = 0; i < length; i++) {
			str = str.concat(randomLetter());
		}
		return str;
	}
});