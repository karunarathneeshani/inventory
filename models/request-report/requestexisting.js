const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');
const schema = mongoose.Schema;

const existingrequestSchema = new schema({

    itemid: { type: String },
    itemType: { type: String },
    employeeId: { type: String },
    requesteduser: { type: String },
    date: { type: Date }


});

module.exports = mongoose.model("RequestExistingItem", existingrequestSchema);
module.exports.saveExistingRequestItem = function(existingrequest, callback) {
    console.log(existingrequest);

    existingrequest.save(callback);

};