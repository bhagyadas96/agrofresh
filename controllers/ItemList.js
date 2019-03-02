var logger = require('../config/logger');
const ItemList = require('../models/itemList');
const uploadUtil = require('../util/_newsfeedUpload');



async function getItemList(req, res) {

    try {
        const itemList = await ItemList.find().exec();
        res.status(200).json({
            success: true,
            data: itemList
        });
    } catch (error) {
        logger.error(error.message, error);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function addItemList(req, res) {
    try {
        uploadUtil.upload(req, res, async(err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
                });
            }

            name = req.body.name;
            vitamins = req.body.vitamins;
            if (name && vitamins) {
                const itemList = await ItemList.create({
                    name: name,
                    vitamins: vitamins,
                    image: `media/${req.files[0].filename}`
                });


                res.status(200).json({
                    success: true,
                    data: itemList
                });

            } else {

                return res.status(400).send({
                    success: false,
                    message: 'Bad request'
                });
            }
        });
    } catch (error) {
        logger.error(error.message, error);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

module.exports = { getItemList, addItemList };