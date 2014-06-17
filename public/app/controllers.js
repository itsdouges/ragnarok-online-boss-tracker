// controllers.js

(function (app) { 'use strict';
	app.controller('wcbtController', ['$scope', '$http', '$routeParams', '$interval', function ($scope, $http, $routeParams, $interval) {
		var wcbtCtrl = this;
		init();

		function init() {
			wcbtCtrl.cards = [];
			wcbtCtrl.monsterimg = 'http://db.irowiki.org/image/monster/';
			wcbtCtrl.mapimg = 'http://db.irowiki.org/image/map/normal/';

			wcbtCtrl.classic =
				{
					monsterinfo : 'http://db.irowiki.org/classic/monster-info/',
					mapinfo : 'http://db.irowiki.org/classic/map-info/',
			 	};

			wcbtCtrl.renewal =
				{
					monsterinfo : 'http://db.irowiki.org/renewal/monster-info/',
					mapinfo : 'http://db.irowiki.org/renewal/map-info/',
			 	};

			$http({
				url: '/monsters',
				method : 'GET',
				async : true,
				cache : true,
				headers : { 'Accept' : 'application/json'}
			}).
			success(function(monsterResponse) {
				angular.forEach(monsterResponse, function(value, key) {
					value.pinned = false;
				});

				wcbtCtrl.cards = monsterResponse;

				if ($routeParams.user) {
					wcbtCtrl.user = $routeParams.user;

					$http({
						url: '/u/' + $routeParams.user,
						method : 'GET',
						async : true,
						cache : false,
						headers : { 'Accept' : 'application/json'}
					}).
					success(function(userResponse) {
						angular.forEach(userResponse, function(value, key) {
							wcbtCtrl.cards[value.cardid].pinned = value.pinned;
							wcbtCtrl.cards[value.cardid].secondsTillSpawn = value.secondsTillSpawn;
							wcbtCtrl.cards[value.cardid].amountKilled = value.amountKilled;
						});
					});
				}
				else {
					console.log('no user to load!');
				}
			});
		}

		wcbtCtrl.respawn = function(cardid, respawntime, user) {
			var request =
			{
				'user' : user,
				'respawntime' : respawntime,
				'cardid' : cardid
			};

			$http({
				url: '/u/',
				method : 'POST',
				async : true,
				headers : { 'Accept' : 'application/json'},
				data : request
			}).success(function(data) {
				wcbtCtrl.cards[cardid].secondsTillSpawn = respawntime * 60;

				if (wcbtCtrl.cards[cardid].amountKilled) {
					wcbtCtrl.cards[cardid].amountKilled++;
				}
				else {
					wcbtCtrl.cards[cardid].amountKilled = 1;
				}
			})
		};

		wcbtCtrl.pin = function (cardid, pinned, user) {
			var pin = pinned;
			if (!pin) {
				pin = false;
			}

			var request =
			{
				'user' : user,
				'cardid' : cardid,
				'pinned' : pin
			};

			$http({
				url: '/p/',
				method : 'POST',
				async : true,
				headers : { 'Accept' : 'application/json'},
				data : request
			}).success(function() {
				//maybe should do smtg lol!
			});
		};
	}]);
}) (angular.module('wcbtapp'));