const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const MTNotification = require('../models/middleTermNotification');
var middleTermNotification = require('../models/middleTermNotification');


let MiddleTermNotification = require('../models/middleTermNotification');

router.post('/setmiddlenotification', function(request, response) {
	console.log(request.body);
	const middleTermNotification = new MTNotification();
	
	const employeeId = request.body.employeeId;
	const itemId = request.body.itemId;
	const msg = request.body.msg;
	const day = request.body.day;
	
	

	middleTermNotification.employeeId = employeeId;
	middleTermNotification.itemId = itemId;
	middleTermNotification.msg = msg;
	middleTermNotification.day = day;
	
	

	if(!employeeId || !msg) {
		response.json({
			"status": "error",
			"message": "Fields ware not provided"
		});
		}else {
				const newMTNotification = new MTNotification({
					employeeId: employeeId,
					itemId: itemId,
					msg: msg,
					day:day
				});
				newMTNotification.save(function(err) {
					if(err) {
						response.statusCode = 500;
						console.log(err);
						response.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
	
					} else {
					response.json({
							"status": "success",
							"message": "messsage successfully created",
							"data": {
								"umsg": msg
					
						}
					});
				}
			});
		}
});

router.get('/showmiddlenotification', function(request, response){
	console.log('show notifications');
	middleTermNotification.find ({}).sort({day: 1})
	.exec(function(err,middlenotifications){
		if(err){
			console.log("error retriving notifications");

		}else{
			response.json(middlenotifications);
		}
	})

});

/*router.get('/notif/:employeeId', function(req, res) {
	//var employeeId = req.body.employeeId;

	middleTermNotification.findOne(req.params.id, req.body, function(err, notify) {
		if(err) throw err;
		
		res.json(notify);
	});
});*/
router.post('/notify', function(req, res) {
	var employeeId = req.body.employeeId;

	middleTermNotification.find({employeeId:employeeId}).sort({day: 1}).exec(function(err, notify) {
		if(err) throw err;
		
		res.json(notify);
	});
});

router.delete('/:id', function(req, res, next) {
	MTNotification.findByIdAndRemove(req.params.id, req.body, function (err, post) {
	  if (err) return next(err);
	  res.json({
		"status": "success",
		"message": "message successfully deleted"
		
});
	});
  })

module.exports = router;
