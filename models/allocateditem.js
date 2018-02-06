const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const allocateditemSchema = mongoose.Schema({
  itemId: { type: String },
  itemName: { type: String },
  itemType: {type: String },
  employeeId: { type: String },
  username: { type: String },
  allocatedate: { type: Date }


});


const AllocatedItem = module.exports = mongoose.model('AllocatedItem', allocateditemSchema);

module.exports.checkEmployeeId = function (guess, done) {
  done(this.employeeId === guess);
}


