var router = require('express').Router();
var mongoose = require('mongoose');
var Page = require('../models/page.js');
var adminUser = require('../models/admin-user.js');
var bcrypt = require('bcrypt-nodejs');

router.get('/',function(req,res){
	res.send('Welcome to the API Zone');
});

// PAGES API
// (CRUD = READ) GET 
router.get('/pages',function(req,res){
	return Page.find(function(err,pages){
		if (!err){
			return res.send(pages);
		} else {
			return res.send(500,err);
		}
	});
});

// (CRUD = CREATE) POST - ADD
router.post('/pages/add',sessionCheck,function(req,res){
	var page = new Page({
		title: req.body.title,
		url: req.body.url,
		content: req.body.content,
		menuIndex: req.body.menuIndex,
		date: new Date(Date.now())
	});

	page.save(function(err){
		if(!err) {
			return res.send(200, page);
		} else {
			return res.send(500,err);
		}
	});
});

// (CRUD = UPDATE) POST - UPDATE
router.post('/pages/update',sessionCheck,function(req,res){
	var id = req.body._id;

	Page.update({
		_id: id
	},{
		$set: {
			title: req.body.title,
			url: req.body.url,
			content: req.body.content,
			menuIndex: req.body.menuIndex,
			date: new Date(Date.now())
		}
	}).exec();
	res.send("Page updated");
});

// (CRUD = DELETE)GET - DELETE
router.get('/pages/delete/:id',sessionCheck,function(req,res){
	var id = req.params.id;

	Page.remove({
		_id: id
	},function(err){
		return console.log(err);
	});

	return res.send('Page id-'+id+' has been deleted.');
});

// OTHERS
// Displaying a single record
router.get('/pages/admin-details/:id',sessionCheck,function(req,res){
	var id = req.params.id;

	Page.findOne({
		_id:id
	}, function(err,page){
		if(err){
			return console.log(err);
		}
		return res.send(page);
	});

});

router.get('/pages/details/:url',function(req,res){
	var url = req.params.url;

	Page.findOne({
		url:url
	}, function(err,page){
		if(err){
			return console.log(err);
		}
		return res.send(page);
	});

});


// ADMIN USERS API
// Adding a new user
router.post('/add-user',function(req,res){
	var salt, hash, password;
	password = req.body.password;
	salt = bcrypt.genSaltSync(10);
	hash = bcrypt.hashSync(password,salt);

	var AdminUser = new adminUser({
		username: req.body.username,
		password: hash
	});
	AdminUser.save(function(err){
		if(!err){
			return res.send('Admin User successfully created');			
		} else {
			return res.send(err);
		}
	});
});
// Logging in a user
router.post('/login',function(req,res){
	var username = req.body.username,
		password = req.body.password;

	adminUser.findOne({
		username: username
	},function(err,data){
		if (err | data === null){
			return res.send(401, "cannot find user");
		} else {
			var usr = data;

			// check if username and password matches the records correctly
			if (username == usr.username && bcrypt.compareSync(password, usr.password)){
				// create a session for the user
				req.session.user = username;
				// return the logged user's username for use
				return res.send(username);
			} else {
				return res.send(401,"username or password is incorrect");
			}
		}
	});
});
// Logging out a user
router.get('/logout',function(req,res){
	// destroys the current session
	req.session.destroy(function(){
		return res.send(401,'user has been logged out');
	});
});

// session checker
function sessionCheck(req,res,next){
	if (req.session.user) { next(); }
	else { res.send(401,'authorization failed'); }
}


module.exports = router;