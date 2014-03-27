var app = angular.module('wcbtapp', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/CHANGEME', {
			controller: 'wcbtController',
			templateUrl: '/partials/user.html'
		})
		.when('/:user', {
			controller: 'wcbtController',
			templateUrl: '/partials/tracker.html'
		})
		.otherwise({ redirectTo: '/CHANGEME' });
});