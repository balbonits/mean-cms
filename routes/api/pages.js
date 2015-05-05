var router = require('express').Router();
var mongoose = require('mongoose');
var Page = require('../models/page.js');

router.get('/',function(req,res){
	return Page.find(function(err,pages){
		if (!err){
			return res.send(pages);
		} else {
			return res.send(500,err);
		}
	});
});

router.post('/add',function(req,res){
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

router.post('/update',function(req,res){
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
module.exports = router;