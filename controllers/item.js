var logger = require('../config/logger');
var ObjectId = require('mongoose').Types.ObjectId;
const Item = require('../models/item');

async function addItem(req, res) {
    item = req.body.item;
    price = req.body.price;
    qty = req.body.qty;
    expire = req.body.expire;
    const farmer = await Farmer.findOne({ _id: req.decoded.id, }).exec()
    try {
        if (item && price && qty && expire && farmer) {
            return res.status(400).send({ sucess: false });
        }
        const items = await Item.create({ item: item, price: price, qty: qty, expire: expire });
        res.status(200).json({
            success: true,
            data: educationLevel
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation"
        });
    }


}

async function deleteItem(req, res) {
    try {
        farmer = req.decoded.id;
        item = req.body.item;

        if (farmer && ObjectId.isValid(item)) {
            const itemObj = await Item.findByIdAndDelete(item).exec();
            res.status(200).json({
                success: true
            });
        } else {
            return res.status(400).send({
                success: false,
                message: 'Bad request'
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

async function updateItem(req, res) {
    try {
        farmer = req.decoded.id;
        item = req.body.item;

        if (farmer && ObjectId.isValid(item)) {
            const itemObj = await Item.findByIdAndUpdate(item).exec();
            res.status(200).json({
                success: true
            });
        } else {
            return res.status(400).send({
                success: false,
                message: 'Bad request'
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


module.exports = addItem;
module.exports = deleteItem;
module.exports = updateItem;