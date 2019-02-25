const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({


    user: { type: Schema.Types.ObjectId, ref: 'User' },
    pincode: { type: String },
    location: { type: String },
    address: [{ type: Schema.Types.ObjectId, ref: 'Address' }]

});

var Customer = mongoose.model('Customer', CustomerSchema);

// make this available to our users in our Node applications
module.exports = Customer;