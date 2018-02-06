const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');


// Item Schema
const LongTermItemSchema = mongoose.Schema({
  itemId: {
    type: String
  },
  itemName: {
    type: String
  },
  itemType: {
    type: String
  },
  itemQuantity: {
    type: String

  },
  referenceId: {
    type: String
  },
  invoiceNumber: {
    type: String
  },
  warrantyType: {
    type: String
  },
  warrantyQuantity: {
    type: String
  },
  itemWarehouse: {
    type: String,
  },
  itemDescription: {
    type: String,
  },
  itemDate:{
    type: Date
  }
});

const LongTermItem = module.exports = mongoose.model('LongTermItem', LongTermItemSchema);

module.exports.getUserByItemName = function(itemName, callback){
    LongTermItem.findById(itemName, callback);
}

//check Already inserted or not
module.exports.getItemByReferenceId = function(referenceId, callback){
  const query = {referenceId: referenceId}
  LongTermItem.findOne(query, callback);
}

module.exports.addLongTermItem = function(newLongTermItem, callback){
   newLongTermItem.save(callback);
}

