const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/ItemList')

router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getItemList(req, res);
});

router.post('/add', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.addItemList(req, res);
});

module.exports = router;