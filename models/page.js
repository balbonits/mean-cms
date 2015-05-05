var db = require('../db');

var Page = db.Schema({
	title: String,
	url: {
		type: String,
		index: {
			unique: true
		}
	},
	content: String,
	menuIndex: Number,
	date: Date
});

module.exports = db.model('Page',Page);