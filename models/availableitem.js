const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const availableitemSchema = mongoose.Schema({
  itemId: {
    type: String
  },
  itemName: {
    type: String
  },
  itemType: {
    type: String
  },
  employeeId: {
    type: String
  },
  day: {
    type: String
  }

}
);


const AvailableItem = module.exports = mongoose.model('AvailableItem', availableitemSchema);

module.exports.checkitemId = function (guess, done) {
  done(this.itemId === guess);
}

module.exports.addAvailableItem = function (newAvailableItem, callback) {
  newAvailableItem.save(callback);
}