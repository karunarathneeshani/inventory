const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Availability = require('../models/availableitem');
const availableitem = require('../models/availableitem');
const Allocation = require('../models/allocateditem');
const allocateditem = require('../models/allocateditem');
const MTNotification = require('../models/middleTermNotification');
const middleTermNotification = require('../models/middleTermNotification');
const MiddleTermItem = require('../models/insertItem/middleTermItem');
const itemallocation = require('../models/itemallocation/itemallocation');

let AvailableItem = require('../models/availableitem');
let AllocatedItem = require('../models/allocateditem');
let MiddleTermNotification = require('../models/middleTermNotification');
let ItemAllocation = require('../models/itemallocation/itemallocation');


router.get('/available', function (request, response) {
	const itemName = request.body.itemType;
	Availability.aggregate([
		{
			$match: {
			}
		},
		{
			$group: {
				_id: "$itemType",
				quantity: { $sum: 1 }
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	], function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.json(result);
	});
});

// done by chamikara(insert item at first time)
router.post('/availableItemInsert', (req, res, next) => {
	let newAvailableItem = new AvailableItem({
		itemId: req.body.itemId,
		itemName: req.body.itemName,
		itemType: req.body.itemType,
		itemBrand: req.body.itemBrand,
		itemDate: req.body.itemDate
	});

	AvailableItem.addAvailableItem(newAvailableItem, (err, availableItem) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to insert to available item' });
		} else {
			res.json({ success: true, msg: 'Item inserted to available item' });
		}
	});
});



router.post('/insertavailability', function (request, response) {
	console.log(request.body);
	var availableitem = new Availability();

	var itemId = request.body.itemId;
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
	var employeeId = request.body.employeeId;
	var day = request.body.day;

	availableitem.itemId = itemId;
	availableitem.itemName = itemName;
	availableitem.itemType = itemType;
	availableitem.employeeId = employeeId;
	availableitem.day = day;

	if (!itemId) {
		response.json({
			"status": "error",
			"message": "Fields were not provided"
		});
	} else {
		var newAvailability = new Availability({
			itemId: itemId,
			itemName: itemName,
			itemType: itemType,
			employeeId: employeeId,
			day:day
		});
		newAvailability.save(function (err) {
			if (err) {
				response.statusCode = 500;
				response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});

			} else {

				Allocation.findOneAndRemove({ itemId: itemId }, function (err, user) {
					if (err) {
						response.statusCode = 500;
						response.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
					} else if (!user) {
						response.statusCode = 404;
						response.json({
							"status": "error",
							"message": "404 Not Found"
						});
					} else {
						AllocatedItem.checkEmployeeId(employeeId, function (isMatch) {
						
							var middleTermNotification = new MTNotification();

							var employeeId = request.body.employeeId;
							var itemId = request.body.itemId;
							var msg = "you returned "+ itemId + " item";


							middleTermNotification.employeeId = employeeId;
							middleTermNotification.itemId = itemId;
							middleTermNotification.msg = msg;




							var newMTNotification = new MTNotification({
								employeeId: employeeId,
								itemId: itemId,
								msg: msg,
							});
							newMTNotification.save(function (err) {
								if (err) {
									response.statusCode = 500;
									response.json({
										"status": "error",
										"message": "500 Internal Server Error"
									});

								} else {
									response.json({
										"status": "success",
										"message": "Return Successful!",
										"data": {
											"msg": msg

										}
									});
								}
							});

							//}
						});
					}
				});
			}
		});

	}
});

router.post('/insertnewavailable', function (request, response) {
	console.log(request.body);
	var availableitem = new Availability();

	var itemId = request.body.itemId;
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;

	availableitem.itemId = itemId;
	availableitem.itemName = itemName;
	availableitem.itemType = itemType;

	if (!itemId) {
		response.json({
			"status": "error",
			"message": "Field was not provided"
		});
	} else {
		var newAvailability = new Availability({
			itemId: itemId,
			itemName: itemName,
			itemType: itemType
		});
		newAvailability.save(function (err) {
			if (err) {
				response.statusCode = 500;
				response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});

			} else {
				response.json({
					"status": "success",
					"message": "itemInserted",
					"data": {
						"msg": "good"

					}
				});
			}
		})

}

});
router.get('/showallocateditems', function (request, response) {
	console.log('show allocated items');
	allocateditem.find({}).sort({ allocatedate: 1 })
		.exec(function (err, allocateditems) {
			if (err) {
				console.log("error retriving allocated items");
				console.log(err);
			} else {
				response.json(allocateditems);
				console.log(allocateditems);
			}
		})

});

router.get('/availableMore',function(request, response){
	console.log('show availables');
	Availability.find ({}).sort({itemType: 1})
	.exec(function(err,moreavailables){
		if(err){
			console.log("error retriving data");

		}else{
			response.json(moreavailables);
		}
	})
});

router.post('/insertallocation', function (request, response) {
	console.log(request.body);
	var allocateditem = new Allocation();

	var itemId = request.body.itemId;
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
	var employeeId = request.body.employeeId;
	var allocatedate = new Date

	allocateditem.itemId = itemId;
	allocateditem.itemName = itemName;
	allocateditem.itemType = itemType;
	allocateditem.employeeId = employeeId;
	allocateditem.allocatedate = allocatedate;

	if (!itemId) {
		response.json({
			"status": "error",
			"message": "Field was not provided"
		});
	} else {
		var newAllocation= new Allocation({
			itemId: itemId,
			itemName: itemName,
			itemType: itemType,
			employeeId: employeeId,
			allocatedate : allocatedate
		});
		newAllocation.save(function (err) {
			if (err) {
				response.statusCode = 500;
				response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});

			} else {

				Availability.findOneAndRemove({ itemId: itemId }, function (err, user) {
					if (err) {
						response.statusCode = 500;
						response.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
					} else if (!user) {
						response.statusCode = 404;
						response.json({
							"status": "error",
							"message": "404 Not Found"
						});
					} else {
						
							var middleTermNotification = new MTNotification();

							var employeeId = request.body.employeeId;
							var itemId = request.body.itemId;
							var msg = "Item No: " + itemId + " was allocated for you";


							middleTermNotification.employeeId = employeeId;
							middleTermNotification.itemId = itemId;
							middleTermNotification.msg = msg;




							var newMTNotification = new MTNotification({
								employeeId: employeeId,
								itemId: itemId,
								msg: msg,
							});
							newMTNotification.save(function (err) {
								if (err) {
									response.statusCode = 500;
									response.json({
										"status": "error",
										"message": "500 Internal Server Error"
									});

								} else {
									response.json({
										"status": "success",
										"message": "msg successfully created",
										"data": {
											"msg": msg

										}
									});
								}
							});

							//}
						
					}
				});
			}
		});

	}
});


module.exports = router;
