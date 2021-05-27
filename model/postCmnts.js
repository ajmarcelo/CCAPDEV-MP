var mongoose = require ("mongoose");

var CmntTab = new mongoose.Schema ({

	username: {
		type: String,
		required: false
	},

	cmntID {
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

	postParent: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model ("Comment", CmntTab);