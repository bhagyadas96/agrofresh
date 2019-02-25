const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    name: String,
    address: { type: String },
    pincode: { type: Number }
});

var Address = mongoose.model('Address', AddressSchema);

// make this available to our users in our Node applications
module.exports = Address;