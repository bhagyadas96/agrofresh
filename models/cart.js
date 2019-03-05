const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const CartSchema = new Schema({

    item: { type: Schema.Types.ObjectId, ref: 'ItemSchema' },
    customer: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    metric: { type: String, default: "kg" },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }

});



// we need to create a model using it
var cart = mongoose.model('Cart', CartSchema);

// make this available to our users in our Node applications
module.exports = cart;