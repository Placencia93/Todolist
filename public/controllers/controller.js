var myApp = angular.module('myApp', []);
// In LA!!

myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope, $http) {
	console.log("message from controller");
	
	$http.get('/todolist').then(function(response){
		console.log("recieved data from server");
		
		$scope.todolist = response.data;
	});
	
	var refresh = function(){
        $http.get('/todolist').then(function(response){
        	console.log("Got data!");
            $scope.todolist = response.data;
        });
    };
	refresh();
	
	$scope.addtodo = function(){ 
		$scope.todo.Status = "Incomplete";
    	console.log($scope.todo);      		
        $http.post('/todolist', $scope.todo).then(function(response){
            console.log(response);
            refresh();
        });
    };
	
	$scope.remove = function(id){
        console.log(id);
        $http.delete('/todolist/' + id).then(function(response){
            refresh();
        });
    };
	
	$scope.edit = function(id){
        console.log(id);
        $http.get('/todolist/' + id).then(function(response){
            $scope.todo = response.data;
			refresh();
        });
    };
	
	$scope.update = function(){
		$scope.todo.Status = "Incomplete";
        console.log($scope.todo._id);
        $http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response){
            refresh();
        });
    };
	
	$scope.complete = function(id){
        console.log(id);
		$scope.todo.Status = "Complete";
        $http.put('/todolist/' + id, $scope.todo).then(function(response){
            refresh();
        });
    };
	
}]);