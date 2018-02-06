const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');


// Item Schema
const MiddleTermItemSchema = mongoose.Schema({
    itemId: {
        type: String
    },
    itemName: {
        type: String
    },
    itemType: {
        type: String
    },
    itemBrand: {
        type: String
    },
    itemQuantity: {
        type: String,
        
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
    referenceId: {
        type: String
    },
    itemWarehouse: {
        type: String
    },
    itemDescription: {
        type: String,
    },
    itemDate: {
        type: Date
    }
});

const MiddleTermItem = module.exports = mongoose.model('MiddleTermItem', MiddleTermItemSchema);

module.exports.getUserByItemName = function(itemName, callback) {
    MiddleTermItem.findById(itemName, callback);
}

//check Already inserted or not
module.exports.getItemByReferenceId = function(referenceId, callback){
    const query = {referenceId: referenceId}
    MiddleTermItem.findOne(query, callback);
}

//Functions to get data for the Report Item
module.exports.getItemByItemId = function(itemId, callback) {
    MiddleTermItem.find({ "itemId": itemId }, callback)
}
module.exports.getItemByFirstLetter = function(itemName, callback) {
    MiddleTermItem.find({ "itemName": itemName }, callback)
}

module.exports.addMiddleTermItem = function(newMiddleTermItem, callback) {
    newMiddleTermItem.save(callback);
}

module.exports.getItemByItemId2 = function(itemId, callback) {
    MiddleTermItem.find({ "itemId": itemId }, callback)
}