var Monsters = require('../models/monster');
var Users = require('../models/user');

exports.index = function(req, res) {
	res.render('layout', { title: 'wcbt: hnic' });
};

exports.populateMonsters = function(req, res) {
	var fs = require('fs');
	var file = __dirname + '\\monster.json';
	console.log('importing from file ' + file);

	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('error importing');
			return;
		}

		data = JSON.parse(data);

		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
			Monsters.create(data[i], function (err) {
				//
			});
		}

		return;
	});
}

exports.getAllMonsters = function(req, res) {
	Monsters.find(function(error, response) {
		if (error) {
			res.json({ error : true });
		}
		else {
			res.json(response);
		}
	});
};

exports.getUser = function(req, res) {
	Users.find({ user: req.params.user }, function(error, response) {
		if (error) {
			res.json({ error : true });
		}
		else {
			for (var i = 0; i < response.length; i++) {
				response[i].secondsTillSpawn = secondsTillSpawn(response[i].spawntime);

				if (response[i].secondsTillSpawn < 0) {
					response[i].secondsTillSpawn = null;
				}
			}

			res.json(response);
		}
	});
};

function addMinutes(minutes) {
    var now = new Date();
    return new Date(now.getTime() + minutes*60000);
}

function secondsTillSpawn(spawntime) {
	if (!spawntime) {
		return; 
	}
	var curdate = new Date();
	var difference = spawntime.getTime() - curdate.getTime();
	return Math.round(difference/1000);
}

exports.respawn = function(req, res) {
	var query = { user: req.body.user, cardid: req.body.cardid };
	var update = 
	{ 
		spawntime : addMinutes(req.body.respawntime), 
		$inc : { amountKilled : 1 }
	};

	Users.update(query, update, { upsert : true }, function(err, numberAffected, raw) {
		if (err) {
			res.json({ error : error });
		}
		else {
			res.json({ success : true });
		}
	});
};

exports.pin = function(req, res) {
	var query = { user: req.body.user, cardid: req.body.cardid };

	Users.update(query, { pinned : req.body.pinned}, { upsert : true }, function(err, numberAffected, raw) {
		if (err) {
			res.json({ error : error });
		}
		else {
			res.json({ success : true });
		}
	});
};