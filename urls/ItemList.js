const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/ItemList')

router.post('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.addItemList(req, res);
});

router.get('/search', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getItemList(req, res);
});

module.exports = router;