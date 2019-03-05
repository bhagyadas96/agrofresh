const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const ItemSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'ItemList' },
    itemPrice: { type: String, required: true },
    quantity: { type: Number, required: true },
    farmer: [{ type: Schema.Types.ObjectId, ref: 'Farmer' }]
});

// we need to create a model using it
var Item = mongoose.model('Item', ItemSchema);

// make this available to our users in our Node applications
module.exports = Item;