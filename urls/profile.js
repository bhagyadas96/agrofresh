const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/profile')

// router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
//     controller.getItemList(req, res);
// });

router.post('/create', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.createProfile(req, res);
});

module.exports = router;