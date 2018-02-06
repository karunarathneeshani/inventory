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
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
var base64 = require('base-64');
var multer = require('multer');
var path = require('path');
const bodyParser = require('body-parser');

let AvailableItem = require('../models/availableitem');
let allocateditem = require('../models/allocateditem');
let MiddleTermNotification = require('../models/middleTermNotification');

router.get('/myAllocations', function(request, response){
    console.log('show all users');
    allocateditem.find({}).exec(function(err, allocateditems){
      if(err){
        console.log("error retriving users");
      }else{
        response.json(allocateditems);
      }
    });
  });
  

router.get('/showallocateditems', function(request, response){
    console.log('show all allocations');
    allocateditems.find({}).exec(function(err, allocateditems){
      if(err){
        console.log("error retriving allocateditems");
      }else{
        response.json(allocateditems);
      }
    });
  });
  



module.exports = router;
