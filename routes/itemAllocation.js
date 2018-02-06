const express = require('express');
const router = express.Router();
const config = require('../config/database');
const itemallocation = require('../models/itemallocation/itemallocation');
const MTNotification = require('../models/middleTermNotification');
const middleTermNotification = require('../models/middleTermNotification');
const availableitem = require('../models/availableitem');
const middleTermItems = require('../models/insertItem/middleTermItem');
const longTermItems = require('../models/insertItem/longTermItem');

let MiddleTermNotification = require('../models/middleTermNotification');
let ItemAllocation = require('../models/itemallocation/itemallocation'); 


router.post('/availableiteminfo', function(req, res) {

    var n = parseInt(req.body.itemId);
    console.log(n);
    availableitem.getItemByItemId(n, (err, item) => {


        if (err) throw err;
        else
            res.json(item);

    });

});


router.post('/itemview', function(req, res) {
    middleTermItems.getItemByItemId2(req.body.itemId, (err, item) => {

        if (err) {
            longTermItems.getItembyItemId(req.body.itemId, (err, item) => {

                if (err) throw err;
                else
                    res.json(item);
            });
        } else {
            res.json(item);
            console.log(item);
        }

    });

});




module.exports = router;