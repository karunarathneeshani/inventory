const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

// Item Schema
const ShortTermItemSchema = mongoose.Schema({
    itemName: {
        type: String
    },
    itemType: {
        type: String
    },
    itemQuantity: {
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

const ShortTermItem = module.exports = mongoose.model('ShortTermItem', ShortTermItemSchema);

module.exports.getUserByItemName = function(itemName, callback) {
    ShortTermItem.findById(itemName, callback);
}

module.exports.getItemByFirstLetter = function(itemName, callback) {
        MiddleTermItem.find({
            "itemName": new RegExp(itemName, "ig")
        }, callback)
    }
    
module.exports.addShortTermItem = function(newShortTermItem, callback) {
    newShortTermItem.save(callback);
}

