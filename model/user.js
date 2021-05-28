var mongoose = require ("mongoose");

var UserTab = new mongoose.Schema ({
	
	fName: {
		type: String,
		required: true
	},

	lName: {
		type: String,
		required: true
	},

	username: {
		type: String,
		required: true
	},

	bio: {
		type: String,
		required: false
	},

	password: {
		type: String,
		required: true
	},

	birthday: {
		type: Date,
		required: true
	},

	country: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	businessName: {
		type: String,
		required: false
	},

	businessYrs: {
		type: String,
		required: false
	},

	proofLink: {
		type: String,
		required: false
	},

	role: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model ("User", UserTab);