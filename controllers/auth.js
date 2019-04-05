var logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const config = require('../config/_config');
var phoneVerification = require('../util/_phoneVerification')(config.API_KEY, config.COUNTRY_CODE);


const User = require('../models/user');

async function userSignin(req, res) {
    try {

        phoneNo = req.body.phone;
        name = req.body.name;
        via = req.body.via;
        console.log(config.API_KEY)
        if (phoneNo && via && name) {
            const user = await User.findOne({ phone: phoneNo }).exec() || await User.create({ phone: phoneNo, name: name });
            if (user) {
                const jwtPayload = { phone: user.phone, id: user.id };
                var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                    expiresIn: '24h' // expires in 24 hours
                });
                phoneVerification.requestPhoneVerification(phoneNo, via, async(err, response) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation " + err.message
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            access_token: jwtToken
                        });
                    }
                });
            }
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

async function userVerify(req, res) {
    try {

        token = req.body.otp;
        phone = req.decoded.phone;
        const user = await User.findOne({ _id: req.decoded.id, }).exec()
        if (token) {
            phoneVerification.verifyPhoneToken(phone, token, async(err, response) => {
                if (err) {

                    res.status(500).json({
                        success: false,
                        message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
                    });

                } else {
                    console.log('Confirm phone success confirming code: ', response);
                    if (response.success) {
                        user.set('verified', true);
                        userSave = await user.save();

                        const jwtPayload = { phone: user.phone, id: user._id };
                        var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                            expiresIn: "7d" // expires in 7 days
                        });



                        res.status(200).json({
                            success: true,
                            access_token: jwtToken
                        });
                    } else {
                        res.status(202).json({
                            success: false,
                            message: 'invalid verification code'
                        });
                    }
                }
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request'
            });
        }

    } catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function retry(req, res) {
    try {
        phoneNo = req.decoded.phone
        id = req.decoded.id;
        via = req.body.via;

        if (phoneNo && via) {

            const jwtPayload = { phone: phoneNo, id: id };
            var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                expiresIn: '5m' // expires in 24 hours
            });

            phoneVerification.requestPhoneVerification(phoneNo, via, async(err, response) => {
                if (err) {
                    logger.error(err.message);
                    res.status(500).json({
                        success: false,
                        message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        access_token: jwtToken
                    });
                }
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request'
            });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}


async function refreshToken(req, res) {
    try {
        phone = req.decoded.phone;
        uid = req.decoded.id;

        if (phone && uid) {
            // Get data from the redis server

            const jwtPayload = { phone: phone, id: uid };
            const jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                expiresIn: "7d" // expires in 24 hours
            });


            res.status(200).json({
                success: true,
                access_token: jwtToken
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad token'
            });
        }
    } catch (error) {
        logger.error(error.message);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}


exports.userSignin = userSignin;
exports.userVerify = userVerify;
exports.retry = retry;
exports.refreshToken = refreshToken;