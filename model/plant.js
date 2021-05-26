var mongoose = require ("mongoose");

var Plant = new mongoose.Schema ({

	pName: {
		type: String,
		required: true
	},

	pScientific: {
		type: String,
		required: false
	},

	pInOut: {
		type: String,
		required: false
	},

	pWater: {
		type: String,
		required: false
	},

	pOrigin: {
		type: String,
		required: false
	},

	pLight: {
		type: String,
		required: false
	},

	pFamily: {
		type: String,
		required: false
	},

	pPhoto: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model ("Plant", Plant);