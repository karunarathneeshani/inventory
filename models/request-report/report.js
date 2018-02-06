const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

const schema = mongoose.Schema;

const reportSchema = new schema({

    itemId: { type: String },
    itemName: { type: String },
    itemType: { type: String },
    reportDescription: { type: String },
    reporteduser: { type: String },
    date: { type: Date }
});

module.exports = mongoose.model("ReportItem", reportSchema);
module.exports.saveReportItem = function(newreport, callback) {
    console.log(newreport);

    newreport.save(callback);
};