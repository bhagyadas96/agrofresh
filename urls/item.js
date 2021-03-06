const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/item')

router.get('/get', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getItem(req, res);
});
router.get('/getdesc/:id', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getItemDesc(req, res);
});

router.post('/add', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.addItem(req, res);
});

router.post('/delete', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.deleteItem(req, res);
});

router.post('/update', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.updateItem(req, res);
});



module.exports = router;