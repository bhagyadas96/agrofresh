const Farmer = require('../models/farmer');
const Customer = require('../models/customer')

var logger = require('../config/logger');


bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;


async function getProfile(req, res) {
    try {
        user = req.decoded.id;
        const farmer = await Farmer.findOne({ _id: user, }).exec() || await Customer.findById(user).exec();
        res.status(200).json({
            success: true,
            data: farmer
        });

    } catch (eroor) {
        logger.error(error);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function registerUser(req, res) {
    try {
        name = req.body.name
        phoneNo = req.body.phone
        mailId = req.body.mailid
        location = req.body.location
        pincode = req.body.pincode
        localityOfDelivery = req.body.localityOfDelivery
        password = req.body.password

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                password = hash;
            });
        });
        if (name && phoneNo && mailId) {
            const user = await Farmer.create({ name: name, phone: phoneNo, mailid: mailId, location: location, pincode: pincode, localityOfDelivery: localityOfDelivery, password: password });
        }
        if (user) {
            const jwtPayload = { name: user.name, id: user.id };
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
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });

    }
}