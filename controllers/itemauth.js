const Item = require('../models/item');


var logger = require('../config/logger');

async function getItem(req, res) {
    try {
        item = req.decoded.id;
        const itemUp = await I.findOne({ _id: user, }).exec()
        res.status(200).json({
            success: true,
            data: farmer
        });

    } catch (eroor) {
        logger.error(error);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}