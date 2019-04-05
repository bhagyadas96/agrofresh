var logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const config = require('../config/_config');

const User = require('../models/user');
const Farmer = require('../models/farmer');


async function createProfile(req, res) {

    //user = req.body.user;
    location = req.body.location;
    pincode = req.body.pincode;
    localityOfDelivery = req.body.localityOfDelivery;
    address = req.body.address;
    const user = await User.findOne({ _id: req.decoded.id, }).exec();
    try {
        if (!location && !pincode && !localityOfDelivery && !address && !user) {
            return res.status(400).send({ sucess: false });
        }
        //console.log(price, item)
        const farmerProfile = await Farmer.create({ location: location, pincode: pincode, localityOfDelivery: localityOfDelivery, address: address, user: user });
        res.status(200).json({
            success: true,
            data: farmerProfile
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation"
        });
    }



}
module.exports = { createProfile }