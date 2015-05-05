var db = require('../db');

var adminUser = db.Schema({
	username: String,
	password: String
});

module.exports = db.model('adminUser',adminUser);