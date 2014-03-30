var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = new Schema({
	user: 
	{
		type: String, 
		required: true
	},
	cardid: 
	{
		type: Number, 
		required: true

	}, 
	spawntime: 
	{
		type: Date,
		required: true
	}, 
	pinned:
	{
		type: Boolean
	},
	secondsTillSpawn:
	{
		type: Number
	},
	amountKilled: 
	{
		type: Number
	}
});

module.exports = mongoose.model('User', userSchema);