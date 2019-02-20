const express = require('express');
const router = express.Router();

const uploadUtil = require('../util/_upload');
const JWTUtil = require('../util/_jwt');
const Exam = require('../models/exam');



router.get('/list', JWTUtil.verifyJWTTokenIsEditor, async(req, res) => {
    try {
        const exams = await Exam.find().select('name _id createdAt updatedAt').exec()
        res.json({
            success: true,
            data: exams
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation"
        });
    }

});

router.post('/add', JWTUtil.verifyJWTTokenIsEditor, async(req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ sucess: false });
    }
    try {
        const exam = await Exam.create({
            name: req.body.name
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation"
        });
    }
});



module.exports = router;