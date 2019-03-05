const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const ItemListSchema = new Schema({
    name: { type: String, required: true },
    vitamins: { type: String, required: true },
    image: { type: String }
});

// we need to create a model using it
var ItemList = mongoose.model('ItemList', ItemListSchema);

// make this available to our users in our Node applications
module.exports = ItemList;