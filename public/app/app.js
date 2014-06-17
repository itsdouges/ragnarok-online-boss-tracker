// app.js

(function (angular) { 'use strict';
	var app = angular.module('wcbtapp', ['ngRoute']);

	app.config(function ($routeProvider, $locationProvider) {
		//$locationProvider.html5Mode(true).hashPrefix('!');

		$routeProvider
			.when('/CHANGEME', {
				templateUrl: '/partials/index.html'
			})
			.when('/:user', {
				controller: 'wcbtController',
				controllerAs: 'btCtrl',
				templateUrl: '/partials/tracker.html'
			})
			.otherwise({ redirectTo: '/CHANGEME' });
	});
}) (angular);