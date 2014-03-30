app.controller('wcbtController', function ($scope, $http, $routeParams, $interval) {
	init();

	function init() {
		$scope.monsterimg = 'http://db.irowiki.org/image/monster/';
		$scope.mapimg = 'http://db.irowiki.org/image/map/normal/';

		$scope.classic = 
			{ 
				monsterinfo : 'http://db.irowiki.org/classic/monster-info/',
				mapinfo : 'http://db.irowiki.org/classic/map-info/', 
		 	};

		$scope.renewal = 
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
		}).success(function(monsterResponse) {	
			angular.forEach(monsterResponse, function(value, key) {
				value.pinned = false;
			});

			$scope.cards = monsterResponse;

			if ($routeParams.user) {
				$scope.user = $routeParams.user;

				$http({
					url: '/u/' + $routeParams.user,
					method : 'GET',
					async : true,
					cache : false,
					headers : { 'Accept' : 'application/json'}
				}).success(function(userResponse) {
					angular.forEach(userResponse, function(value, key) {
						$scope.cards[value.cardid].pinned = value.pinned;
						$scope.cards[value.cardid].secondsTillSpawn = value.secondsTillSpawn;
						$scope.cards[value.cardid].amountKilled = value.amountKilled;
					});
				});
			}
			else {
				console.log('no user to load!');
			}
		});
	}	

	$scope.respawn = function(cardid, respawntime, user) {
		var request =
		{
			'user' : user,
			'respawntime' : respawntime,
			'cardid' : cardid
		};

		console.log(request);

		$http({
			url: '/u/',
			method : 'POST',
			async : true,
			headers : { 'Accept' : 'application/json'},
			data : request
		}).success(function(data) {
			$scope.cards[cardid].secondsTillSpawn = respawntime * 60;

			if ($scope.cards[cardid].amountKilled) {
				$scope.cards[cardid].amountKilled++;
			}
			else {
				$scope.cards[cardid].amountKilled = 1;
			}
		})
	};

	$scope.pin = function (cardid, pinned, user) {
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
});