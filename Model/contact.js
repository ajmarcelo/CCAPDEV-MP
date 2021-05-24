var mongoose = require ("mongoose");

var ContactUs = new mongoose.Schema ({

	feedback: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model ("Contact", ContactUs);