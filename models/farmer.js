const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FarmerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    location: { type: String },
    pincode: { type: String, required: true },
    localityOfDelivery: { type: Number },
    adress: [{ type: Schema.Types.ObjectId, ref: 'Address' }]
});



// we need to create a model using it
var Farmer = mongoose.model('Farmer', FarmerSchema);

// make this available to our users in our Node applications
module.exports = Farmer;