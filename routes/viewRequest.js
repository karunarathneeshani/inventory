const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const viewnewrequest = require('../models/request-report/requestnew');
const viewexrequest = require('../models/request-report/requestexisting');
const viewreport = require('../models/request-report/report');

router.get('/newRequest', function(request, response) {
    console.log('view requests');
    viewnewrequest.find({})
        .exec(function(err, newRequests) {
            if (err) {
                console.log("error retriving requests");

            } else {
                response.json(newRequests);
            }
        })

});
router.get('/exRequest', function(request, response) {
    console.log('view requests');
    viewexrequest.find({})
        .exec(function(err, exRequests) {
            if (err) {
                console.log("error retriving requests");

            } else {
                response.json(exRequests);
            }
        })

});
router.get('/viewReport', function(request, response) {
    console.log('view requests');
    viewreport.find({})
        .exec(function(err, reports) {
            if (err) {
                console.log("error retriving reports");

            } else {
                response.json(reports);
            }
        })

});
module.exports = router;