const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const ItemSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'ItemList' },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    expire: { type: Date, required: true },
    farmer: { type: Schema.Types.ObjectId, ref: 'Farmer' }
});

// we need to create a model using it
var Item = mongoose.model('Item', ItemSchema);

// make this available to our users in our Node applications
module.exports = Item;