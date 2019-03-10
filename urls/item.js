const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/item')

router.post('/add', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.addItem(req, res);
});

router.post('/delete', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.deleteItem(req, res);
});



module.exports = router;