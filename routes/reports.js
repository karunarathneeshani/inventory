const express = require('express');
const router = express.Router();
const config = require('../config/database');
const ReportItem = require('../models/request-report/report');
const middleTermItem = require('../models/insertItem/middleTermItem');


router.get('/getDefectItem', function(req, res) {

    ReportItem.find({},function(err,items){
        if(err){
            console.log(err);
          } else{
            res.json({
                item:items
            });
              //console.log('item',items);
          }
    });

});
router.get('/getMiddleTermItem', function(req, res) {

    middleTermItem.find({},function(err,items){
        if(err){
            console.log(err);
          } else{
            res.json({
                item:items
            });
              //console.log('item',items);
          }
    });

});

module.exports = router;