const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');
const schema = mongoose.Schema;

const newrequestSchema = new schema({

    itemName: { type: String },
    itemType: { type: String },
    itemsNeeded: { type: String },
    requestReason: { type: String },
    requesteduser: { type: String },
    date: { type: Date }

});

module.exports = mongoose.model("RequestNewItem", newrequestSchema);
module.exports.saveNewRequestItem = function(newrequest, callback) {
    console.log(newrequest);

    newrequest.save(callback);
};