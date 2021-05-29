var mongoose = require ("mongoose");

var PostTab = new mongoose.Schema ({

	username: {
		type: String,
		required: true
	},

	postID: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		required: true
	},

	plant: {
		type: String,
		required: true
	},

	typeCQ: {
		type: String,
		required: true
	},

	content: {
		type: String,
		required: true
	},

	file: { 
		type: String,
		required: false
	},

	upCtr: {
		type: Number,
		required: true
	},

	downCtr: {
		type: Number,
		required: true
	},

	owner: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model ("Post", PostTab);