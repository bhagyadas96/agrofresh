const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/auth');
const cartController = require('../controllers/cart')

router.get('/getprofile', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getProfile(req, res);
});
router.post('/login', async(req, res) => {
    controller.login(req, res);
});

router.post('/register', async(req, res) => {
    controller.registerUser(req, res);
});
router.post('/cart', async(req, res) => {
    cartController.addToCart(req, res);
});
// router.get('/refresh_token', jwtUtil.verifyJWTRefresh, async(req, res) => {
//     controller.refreshToken(req, res);
// });

module.exports = router;