const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

const schema = mongoose.Schema;

const itemtypeSchema = new schema({

    itemType: { type: String },

});

module.exports = mongoose.model("ItemType", itemtypeSchema);
module.exports.saveItemType = function(newItemType, callback) {
    console.log(newItemType);

    newItemType.save(callback);
};