const express = require('express');
const router = express.Router();
const config = require('../config/database');
const supplier = require('../models/supplier/supplier');

let SuppliersData = require('../models/supplier/supplier');
//Insertion
router.post('/setsupplier', function(request, response) {
	console.log(request.body);
	var suppliersData = new Supplier();
	
	
	var supplierId = request.body.supplierId;
	var supplierName = request.body.supplierName;
	var companyPhoneNumber = request.body.companyPhoneNumber;
	var contactPersonName= request.body.contactPersonName;
	var contactNumber= request.body.contactNumber;
	var supplierItemTypes= request.body.supplierItemTypes
	
	console.log(supplierId + " -> " + supplierName);
	suppliersData.supplierId = supplierId;
	suppliersData.supplierName = supplierName;
	suppliersData.companyPhoneNumber = companyPhoneNumber;
	suppliersData.contactPersonName = contactPersonName;
	suppliersData.contactNumber = contactNumber;
	suppliersData.supplierItemTypes = supplierItemTypes;

	
	

	if(!supplierId || !supplierName) {
		response.json({
			"status": "error",
			"message": "Fields ware not provided"
		});
		}else {
				var newSupplier = new Supplier({
					supplierId: supplierId,
					supplierName: supplierName,
					companyPhoneNumber: companyPhoneNumber,
					contactPersonName:contactPersonName,
					contactNumber:contactNumber,
					supplierItemTypes: supplierItemTypes,
				});
				newSupplier.save(function(err) {
					if(err) {
						res.statusCode = 500;
						res.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
	
					} else {
					response.json({
							"status": "success",
							"message": "msg successfully created",
							"data": {
								"supplierName": supplierName
					
						}
					});
				}
			});
		}
});


//Deletion
router.post('/deletesupplier', function(req, res) {
	
	
	var supplierId = req.body.supplierId;
	var supplierName = req.body.supplierName;
	var companyPhoneNumber = req.body.companyPhoneNumber;
	var contactPersonName= req.body.contactPersonName;
	var contactNumber= req.body.contactNumber;
	var supplierItemTypes= req.body.supplierItemTypes;
	
	
	console.log(supplierId);
	
	if(!supplierId ) {
		res.statusCode = 401;
		res.json({
			"status": "error",
			"message": "supplierId was not provided"
		});
	} else {
		SuppliersData.findOneAndRemove({supplierId: supplierId}, function(err, user) {
			if(err) {
				res.statusCode = 500;
				res.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});
			} else if(!user) {
				res.statusCode = 404;
				res.json({
					"status": "error",
					"message": "404 Not Found"
				});
			} else {
						res.json({
							"status": "success",
							"message": "successfully deleted in",
							"data": {
								"supplierId": user.supplierId
							}
					});
				}
			});
		}
});

//Update
router.post('/updateSupplier',function(req, res){
	
	
	console.log('Update value');
	SuppliersData.findOneAndUpdate(req.params.supplierId,
	{
		$set:{supplierId:req.body.supplierId,supplierName:req.body.supplierName,companyPhoneNumber:req.body.companyPhoneNumber,contactPersonName:req.body.contactPersonName,contactNumber:req.body.contactNumber,supplierItemTypes:req.body.supplierItemTypes}
	},
	{
		new: true
	},
	function(err,user){
		if(err){
			res.send("Error updating");

		}else{
			res.json({
				"status": "success",
				"message": "successfully updated in",
				"data": {
					"supplierId": user.supplierId
				}
		});
		}
	});
});



module.exports = router;