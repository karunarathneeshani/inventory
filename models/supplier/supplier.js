const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

// User Schema
const SupplierSchema = mongoose.Schema({
    supplierId: {type: String},
    supplierName: {type: String},
    companyPhoneNumber: {type: String},
    contactPersonName: {type: String},
    contactNumber: {type: String},
    supplierItemTypes: {type: String}
});

const Supplier = module.exports = mongoose.model('Supplier',SupplierSchema); 

module.exports.checkSupplierId = function(guess, done) {
    done(this.supplierId === guess);
}