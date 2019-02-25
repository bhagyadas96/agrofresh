const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/auth')

/**
 * Request for first time registeration
 *
 * @param {!string} phone
 * @param {!string} via - call or sms
 * 
 * Note that the token it return will expire in 5m
 */
router.post('/signin', async(req, res) => {
    controller.userSignin(req, res);
});


/**
 * Request for resending code via sms or call
 *
 * @param {!string} via - call or sms
 * 
 * Note that the token it return will expire in 5m
 */
router.post('/retry', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.retry(req, res);
});

/**
 * Request for verify the phone no.
 *
 * @param {!number} otp
 * 
 */

router.post('/verify', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.userVerify(req, res);
});



/**
 * Request for refresh token
 *
 * Just send a plain get requiest
 * 
 */
router.get('/refresh_token', jwtUtil.verifyJWTRefresh, async(req, res) => {
    controller.refreshToken(req, res);
});

module.exports = router;