const Farmer = require('../models/farmer');
const Customer = require('../models/customer');
const User = require('../models/user');
const Item = require('../models/item');

var logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const config = require('../config/_config');

SALT_WORK_FACTOR = 10;


async function login(req, res) {
    try {
        username = req.body.email
        password = req.body.password
        const user = await User.findOne({ email: username }).exec();
        if (user) {

            user.verifyPassword(password, async function(error, data) {

                if (error) {
                    res.status(400).json({
                        success: false,
                        message: 'Bad request'
                    });
                }
                const jwtPayload = { name: user.name, id: user.id };
                var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                    expiresIn: '5m' // expires in 24 hours
                });
                res.status(200).json({
                    success: true,
                    access_token: jwtToken
                });
            })
        }


    } catch (error) {
        logger.error(error.message);
    }
}




async function getProfile(req, res) {
    try {
        user = req.decoded.id;
        const farmer = await Farmer.findOne({ user: user, }).exec() || await Customer.findById(user).exec();
        res.status(200).json({
            success: true,
            data: farmer
        });

    } catch (error) {
        logger.error(error.message);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}


async function insertItem(req, res) {
    try {
        itemName = req.body.itemName
        itemPrice = req.body.itemPrice
        quantity = req.body.quantity
    } catch (error) {

    }
}

async function registerUser(req, res) {
    try {

        isFarmer = req.body.isFarmer
        name = req.body.name
        phone = req.body.phone
        email = req.body.email
        location = req.body.location
        pincode = req.body.pincode
        password = req.body.password

        await User.findOne({
            email: email
        }, async function(err, existingUser) {
            if (existingUser) {

                res.status(400).json({
                    success: false,
                    message: 'Bad request'
                });
            }

            // Create and save the user if it doesn't exist
            const user = await new Promise(async(resolve) => {
                value = await User.create({
                    email: email,
                    password: password
                })
                if (value)
                    resolve(value);
            });
            if (isFarmer) {
                localityOfDelivery = req.body.localityOfDelivery
                const farmer = await Farmer.create({ user: user, name: name, phone: phone, email: email, location: location, pincode: pincode, localityOfDelivery: localityOfDelivery });
            } else {

                console.log(email)
                const customer = await Customer.create({ user: user, name: name, phone: phone, email: email, location: location, pincode: pincode })
            }
            if (user) {
                const jwtPayload = { name: name, id: user.id };
                var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                    expiresIn: '5m' // expires in 24 hours
                });
                res.status(200).json({
                    success: true,
                    access_token: jwtToken
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Bad request'
                });
            }

        });

    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });

    }
}

module.exports = { registerUser, getProfile, login };