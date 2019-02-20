const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const CustomerSchema = new Schema({


    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    phone: { type: String, required: true },
    email: { type: String, unique: true },
    pincode: { type: String },
    location: { type: String }

});

var Customer = mongoose.model('Customer', CustomerSchema);

// make this available to our users in our Node applications
module.exports = Customer;