var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	$routeProvider

	.when('/', {
		templateUrl : 'views/home.html',
		controller : 'homeController'
	})

	.otherwise ( { redirectTo: '/' } );
});
