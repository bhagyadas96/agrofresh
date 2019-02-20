const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const ItemSchema = new Schema({
    itemName: { type: String, required: true },
    itemPrice: { type: String, required: true },
    quantity: { type: String, required: true },
    image: { type: String },
    FarmerReference: [{ type: Schema.Types.ObjectId, ref: 'FarmerSchema' }]

});



// we need to create a model using it
var Item = mongoose.model('Item', ItemSchema);

// make this available to our users in our Node applications
module.exports = Item;