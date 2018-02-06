const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

var requestDataSchema = mongoose.Schema({
 
        // employeeId: String,
        // itemId: String,
        // msg: String
  });

requestDataSchema.methods.checkItemName = function(guess, done) {
  done(this.itemId === guess);
}

module.exports = mongoose.model('RequestData',requestDataSchema); 
