const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const FarmerSchema = new Schema({


    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    phone: { type: String, required: true },
    email: { type: String, unique: true },
    location: { type: String },
    pincode: { type: String, required: true },
    localityOfDelivery: { type: Number }

});



// we need to create a model using it
var Farmer = mongoose.model('Farmer', FarmerSchema);

// make this available to our users in our Node applications
module.exports = Farmer;