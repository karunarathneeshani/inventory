const express = require('express');
const router = express.Router();
const config = require('../config/database');
const ExistingRequestItem = require('../models/request-report/requestexisting');
const MiddleTermItem = require('../models/insertItem/middleTermItem');
//const ShortTermItem = require('../models/insertItem/shortTermItem');

router.post("", function(req, res) {

    const existingrequest = new ExistingRequestItem({

        itemType: req.body.itemType,
        itemId: req.body.itemId,
        employeeId: req.body.employeeId,
        requesteduser: req.body.requesteduser,
        date: new Date
    });

    ExistingRequestItem.saveExistingRequestItem(existingrequest, function(err, existingrequest) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });

        }
        if (existingrequest) {
            res.json({ state: true, msg: "data inserted" });
        }
    });

});

router.post('/showRequestExistingItem', function(req, res) {

    var n = req.body.itemName;
    console.log(n);
    MiddleTermItem.getItemByFirstLetter(n, (err, item) => {


        if (err) throw err;
        else
            res.json(item);

    });

});

module.exports = router;