var logger = require('../config/logger');
const ItemList = require('../models/itemList');
const uploadUtil = require('../util/_newsfeedUpload');

async function getItemList(req, res) {
    try {


        const user = req.decoded.id;
        if (user) {
            uploadUtil.upload(req, res, async(err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
                    });
                }

                name = req.body.name;
                vitamins = req.body.vitamins;
                const item = await ItemList.create({
                    name: name,
                    vitamins: vitamins,
                    image: `media/${req.files[0].filename}`
                });


                res.status(200).json({
                    success: true,
                    data: item
                });
            });
        }
    } catch (error) {
        logger.error(error.message);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function search(req, res) {

    let query = req.query.query;
    if (!query) {
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }

    try {
        const regex = new RegExp(query, 'i'); // 'i' makes it case insensitive
        const itemList = await ItemList.find({ name: regex }).exec();
        res.status(200).json({
            sucess: true,
            data: itemList
        });

    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation"
        });
    }
}
exports.getItemList = getItemList;
exports.search = search;