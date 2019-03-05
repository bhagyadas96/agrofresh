const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/cart')

router.post('/create', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getFromCart(req, res);
});


module.exports = router;