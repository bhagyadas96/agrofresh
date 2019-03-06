const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/cart')

router.post('/get', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getCart(req, res);
});

router.post('/add', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.addToCart(req, res);
});
router.post('/update', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.updateCart(req, res);
});
router.post('/delete', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.deleteCart(req, res);
});


module.exports = router;