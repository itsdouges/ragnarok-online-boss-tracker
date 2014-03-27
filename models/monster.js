var mongoose = require('mongoose'), Schema = mongoose.Schema;

var monsterSchema = new Schema({
	id: {
			type: Number, 
			unique: true,
			required: true
		}, 
	monstername: String,
	hasvariance : Boolean,
	mapid: String, 
	monsterid: Number,
	spawntime: Number,
	renewal: Boolean
});

module.exports = mongoose.model('monster', monsterSchema);