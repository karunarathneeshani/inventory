const express = require('express');
const router = express.Router();
const config = require('../config/database');
const NewRequestItem = require('../models/request-report/requestnew');


router.post("", function(req, res) {


    const newrequest = new NewRequestItem({

        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemsNeeded: req.body.itemsNeeded,
        requestReason: req.body.requestReason,
        requesteduser: req.body.requesteduser,
        date: new Date
    });

    NewRequestItem.saveNewRequestItem(newrequest, function(err, newrequest) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
        }
        if (newrequest) {
            res.json({ state: true, msg: "data inserted" });
        }
    });
});


module.exports = router;