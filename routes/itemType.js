const express = require('express');
const router = express.Router();
const config = require('../config/database');
const itemType = require('../models/itemallocation/itemtype');

router.post("", function(req, res) {

    const newItemType = new itemType({

        itemType: req.body.itemType
    });

    itemType.saveItemType(newItemType, function(err, newItemType) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
            console.log(err);
        }
        if (newItemType) {
            res.json({ state: true, msg: "data inserted" });
        }
    });

});

router.get('/showItemType', function(request, response) {

    itemType.find({})
        .exec(function(err, itemType) {
            if (err) {
                console.log("error retriving type");

            } else {
                response.json(itemType);
            }
        })

});





module.exports = router;