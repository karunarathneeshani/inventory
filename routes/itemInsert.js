const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const ShortTermItem = require('../models/insertItem/shortTermItem');
const MiddleTermItem = require('../models/insertItem/middleTermItem');
const LongTermItem = require('../models/insertItem/longTermItem');
const MTNotification = require('../models/middleTermNotification');
const middleTermNotification = require('../models/middleTermNotification');

let MiddleTermNotification = require('../models/middleTermNotification');

// Insert
router.post('/shortTermInsert', (req, res, next) => {
    let newShortTermItem = new ShortTermItem({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemQuantity: req.body.itemQuantity,
        itemWarehouse: req.body.itemWarehouse,
		itemDescription: req.body.itemDescription,
		reorderLevel : req.body.reorderLevel,
		reorderTime : req.body.reorderTime
    });

    ShortTermItem.addShortTermItem(newShortTermItem, (err, shortTermItem) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to insert item' });
            console.log(err);
        } else {

			var middleTermNotification = new MTNotification();
	
	var employeeId = "emp0001";
	var itemName = req.body.itemName;
	var reorderLevel = req.body.reorderTime;
	var reorderTime = req.body.reorderLevel;
	var msg = "ReorderDate of " + itemName + " is " + reorderLevel + " "  + reorderTime + " after today";
	
	
	middleTermNotification.employeeId = employeeId;
	middleTermNotification.itemName = itemName;
	middleTermNotification.reorderLevel = reorderLevel;
	middleTermNotification.reorderTime = reorderTime;
	middleTermNotification.msg = msg;
	
	


				var newMTNotification = new MTNotification({
					employeeId: employeeId,
					itemName: itemName,
					reorderLevel: reorderLevel,
					reorderTime: reorderTime,
					msg: msg,
				});
				newMTNotification.save(function(err) {
					if(err) {
						res.statusCode = 500;
						res.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
	
					} else {
					res.json({
							"status": "success",
							"message": "Item" + itemName + "was inserted and Notification sent to" + employeeId + "employee",
							"data": {
								"msg": msg
					
						}
					});
				}
			});
        }
    });
});


router.post('/middleTermInsert', (req, res, next) => {
	let newMiddleTermItem = new MiddleTermItem({
		itemId: req.body.itemId,
		itemName: req.body.itemName,
		itemType: req.body.itemType,
		itemBrand: req.body.itemBrand,
		invoiceNumber: req.body.invoiceNumber,
		warrantyType: req.body.warrantyType,
		warrantyQuantity: req.body.warrantyQuantity,
		referenceId: req.body.referenceId,
		itemWarehouse: req.body.itemWarehouse,
		itemDescription: req.body.itemDescription,
		itemDate: req.body.itemDate
	});

	MiddleTermItem.addMiddleTermItem(newMiddleTermItem, (err, middleTermItem) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to insert item' });
			console.log(err);
		} else {
			res.json({ success: true, msg: 'Item inserted' });
		}
	});
});

router.post('/longTermInsert', (req, res, next) => {
	let newLongTermItem = new LongTermItem({
		itemId: req.body.itemId,
		itemName: req.body.itemName,
		itemType: req.body.itemType,
		itemBrand: req.body.itemBrand,
		itemQuantity: req.body.itemQuantity,
		invoiceNumber: req.body.invoiceNumber,
		warrantyType: req.body.warrantyType,
		warrantyQuantity: req.body.warrantyQuantity,
		referenceId: req.body.referenceId,
		itemWarehouse: req.body.itemWarehouse,
		itemDescription: req.body.itemDescription,
		itemDate: req.body.itemDate
	});

	LongTermItem.addLongTermItem(newLongTermItem, (err, longTermItem) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to insert item' });
			console.log(err);
		} else {
			res.json({ success: true, msg: 'Item inserted' });
		}
	});
});

// checkMiddleTermInsert
router.post('/checkMiddleTermInsert', (req, res, next) => {
	console.log('in the checkMiddleTermInsert');
	const referenceId = req.body.referenceId;
	MiddleTermItem.getItemByReferenceId(referenceId, (err, item) => {
	  console.log(item);
	  if (err) throw err;
	  if (!item) {
		return res.json({ status: false, msg: 'item not found' });
	  }else{
		return res.json({ status: true, msg: 'item found' });
	  }
  
	});
  });

// checkLongTermInsert
router.post('/checkLongTermInsert', (req, res, next) => {
	console.log('in the checkLongTermInsert');
	const referenceId = req.body.referenceId;
	LongTermItem.getItemByReferenceId(referenceId, (err, item) => {
	  console.log(item);
	  if (err) throw err;
	  if (!item) {
		return res.json({ status: false, msg: 'item not found' });
	  }else{
		return res.json({ status: true, msg: 'item found' });
	  }
  
	});
	});
	
	router.get('/showMiddleTermItems', function(request, response) {
    console.log('show middle term items');
    MiddleTermItem.find({})
        .exec(function(err, middleTermItems) {
            if (err) {
                console.log("error retriving middle term items");

            } else {
                response.json(middleTermItems);
            }
        })


});

//middle term deletion
router.post('/deleteMiddle', function(request, response) {
	
	
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
    var itemBrand= request.body.itemBrand;
    var itemQuantity= request.body.itemQuantity;
    var invoiceNumber= request.body.invoiceNumber;
    var warrantyType= request.body.warrantyType;
    var warrantyQuantity= request.body.warrantyQuantity;
    var referenceId= request.body.referenceId;
    var itemWarehouse= request.body.itemWarehouse;
    var itemDescription=request.body.itemDescription;

	 console.log(itemName );
	if(!itemName ) {
		response.statusCode = 401;
		response.json({
			"status": "error",
			"message": "itemId was not provided"
		});
	} else {
		MiddleTermItem.findOneAndRemove({itemName: itemName}, function(err, user) {
			if(err) {
				response.statusCode = 500;
				response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});
			} else if(!user) {
				response.statusCode = 404;
				response.json({
					"status": "error",
					"message": "404 Not Found"
				});
			} else {
						response.json({
							"status": "success",
							"message": "successfully deleted in",
							"data": {
								"itemName": user.itemName
							}
						});
					}
				});
			}
		});


//middle term update
router.post('/updateMiddle',function(request, response){
	
	
	console.log('Update value');
	MiddleTermItem.findOneAndUpdate(request.params.itemName,
	{
        $set:{itemName:request.body.itemName,itemType:request.body.itemType,itemBrand:request.body.itemBrand,itemQuantity:request.body.itemQuantity,
            invoiceNumber:request.body.invoiceNumber,warrantyType:request.body.warrantyType,warrantyQuantity:request.body.warrantyQuantity,referenceId:request.body.referenceId,itemWarehouse:request.body.itemWarehouse,itemDescription:request.body.itemDescription }
	},
	{
		new: true
	},
	function(err,user){
		if(err){
			response.send("Error updating");

		}else{
			response.json({
				"status": "success",
				"message": "successfully Updated in",
				"data": {
					"itemName": user.itemName
				}
			});
		}
	});
});       

// long term deletion
router.post('/deleteLong', function(request, response) {
	
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
    var itemBrand= request.body.itemBrand;
    var itemQuantity= request.body.itemQuantity;
    var invoiceNumber= request.body.invoiceNumber;
    var warrantyType= request.body.warrantyType;
    var warrantyQuantity= request.body.warrantyQuantity;
    var itemWarehouse= request.body.itemWarehouse;
    var itemDescription=request.body.itemDescription;


	 console.log(itemName );
	if(!itemName ) {
		response.statusCode = 401;
		response.json({
			"status": "error",
			"message": "itemId was not provided"
		});
	} else {
		LongTermItem.findOneAndRemove({itemName: itemName}, function(err, user) {
			if(err) {
				response.statusCode = 500;
				response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});
			} else if(!user) {
				response.statusCode = 404;
				response.json({
					"status": "error",
					"message": "404 Not Found"
				});
			} else {
						response.json({
							"status": "success",
							"message": "successfully deleted in",
							"data": {
								"itemName": user.itemName
							}
						});
					}
				});
			}
		});
//Long term update
router.post('/updateLong',function(request, response){
	
	
	console.log('Update value');
	LongTermItem.findOneAndUpdate(request.params.itemName,
	{
        $set:{itemName:request.body.itemName,itemType:request.body.itemType,itemBrand:request.body.itemBrand,itemQuantity:request.body.itemQuantity,
            invoiceNumber:request.body.invoiceNumber,warrantyType:request.body.warrantyType,warrantyQuantity:request.body.warrantyQuantity,itemWarehouse:request.body.itemWarehouse,itemDescription:request.body.itemDescription }
	},
	{
		new: true
	},
	function(err,user){
		if(err){
			response.send("Error updating");

		}else{
			response.json({
				"status": "success",
				"message": "successfully Updated in",
				"data": {
					"itemName": user.itemName
				}
			});
		}
	});
});       
		

//short term deletion
router.post('/deleteShort', function(request, response) {
	
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
    var itemQuntity= request.body.itemQuntity;
    var itemWarehouse= request.body.itemWarehouse;
    var itemDescription= request.body.itemDescription;

	 console.log(itemName );
	if(!itemName ) {
		response.statusCode = 401;
		response.json({
			"status": "error",
			"message": "itemId was not provided"
		});
	} else {
		ShortTermItem.findOneAndRemove({itemName: itemName}, function(err, user) {
			if(err) {
				response.statusCode = 500;
				response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});
			} else if(!user) {
				response.statusCode = 404;
				response.json({
					"status": "error",
					"message": "404 Not Found"
				});
			} else {
						response.json({
							"status": "success",
							"message": "successfully deleted in",
							"data": {
								"itemName": user.itemName
							}
						});
					}
				});
			}
		});

//Short Term Update
router.post('/updateShort',function(request, response){
	
	
	console.log('Update value');
	ShortTermItem.findOneAndUpdate(request.params.itemName,
	{
        $set:{itemName:request.body.itemName,itemType:request.body.itemType,itemQuntity:request.body.itemQuntity,
            itemWarehouse:request.body.itemWarehouse,itemDescription:request.body.itemDescription }
	},
	{
		new: true
	},
	function(err,user){
		if(err){
			response.send("Error updating");

		}else{
			response.json({
				"status": "success",
				"message": "successfully Updated in",
				"data": {
					"itemName": user.itemName
				}
			});
		}
	});
});       





  module.exports = router;