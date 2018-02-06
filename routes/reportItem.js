const express = require('express');
const router = express.Router();
const waterfall = require('async-waterfall');
const async = require('async');
const config = require('../config/database');
const ReportItem = require('../models/request-report/report');
const MiddleTermItem = require('../models/insertItem/middleTermItem');
const LongTermItem = require('../models/insertItem/longTermItem');
const ShortTermItem = require('../models/insertItem/shortTermItem');

router.post("", function(req, res) {

    const newreport = new ReportItem({

        itemId: req.body.itemId,
        itemName: req.body.itemName,
        reportDescription: req.body.reportDescription,
        date: new Date
    });

    ReportItem.saveReportItem(newreport, function(err, report) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
            console.log(err);
        }
        if (report) {
            res.json({ state: true, msg: "data inserted" });
        }
    });

});
ItemArray = [];
var ItemObject = function(id, itemId, name) {
    this.id = id;
    this.itemId = itemId;
    this.name = name;
}

router.get('/getAllItem', function(req, res) {
    async.waterfall([
            function(callback) {
                MiddleTermItem.find(function(err, items) {

                    items.forEach(function(item) {
                        var id = item._id;
                        var itemId = item.itemId;
                        var itemname = item.itemName;
                        var newItemObjec = new ItemObject(id, itemId, itemname);
                        ItemArray.push(newItemObjec);
                    });
                    callback(null, ItemArray);

                });

            },

            function(ItemArray, callback) {
                LongTermItem.find(function(err, items) {

                    items.forEach(function(item) {
                        var id = item._id;
                        var itemId = item.itemId;
                        var itemname = item.itemName;
                        var newItemObjec = new ItemObject(id, itemId, itemname);
                        ItemArray.push(newItemObjec);
                    });
                    callback(null, ItemArray);
                });

            }
        ],
        function(err, ItemArray) {

            if (err) {
                res.statusCode = 500;
                res.json({
                    success: false,
                    message: 'error get long items'
                });
            } else {
                res.statusCode = 200;
                console.log('Main Callback --> ' + ItemArray);
                res.json({
                    success: true,
                    ItemArray: ItemArray
                });
            }

        }
    );

});



router.post('/showReportItem', function(req, res) {

    var n = req.body.itemId;
    console.log(n);
    MiddleTermItem.getItemByItemId(n, (err, item) => {


        if (err) throw err;
        else
            res.json(item);

    });

});



module.exports = router;