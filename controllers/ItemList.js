var logger = require('../config/logger');
const ItemList = require('../models/itemList');
const uploadUtil = require('../util/_newsfeedUpload');

async function getItemList(req, res) {
    try {

        if (user) {
            uploadUtil.upload(req, res, async(err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
                    });
                }

                // Idea is to save the url of the media file in db
                // name = req.body.name;
                // vitamins = req.body.vitamins;
                // const ItemList = await ItemList.create({
                //     caption: caption,
                //     media: `media/${req.files[0].filename}`
                // });


                res.status(200).json({
                    success: true,
                    data: item
                });
            });
        }
    } catch (error) {
        logger.error(error);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}
exports.ItemList = getItemList;