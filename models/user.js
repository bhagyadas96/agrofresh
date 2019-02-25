var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

// Set up Mongo Schema
var UserSchema = new mongoose.Schema({
    phone: { type: Number, unique: true },
    name: String
});


module.exports = mongoose.model('User', UserSchema);