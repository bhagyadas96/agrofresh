var logger = require('../config/logger');
var ObjectId = require('mongoose').Types.ObjectId;
const Cart = require('../models/cart');
const Item = require('../models/item');



async function getCart(req, res) {

    try {
        user = req.decoded.id;
        if (user) {
            const cart = await Cart.find({ customer: user, status: true }).populate('item').exec();
            res.status(200).json({
                success: true,
                data: cart
            });
        } else {
            res.status(400).json({
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

async function addToCart(req, res) {

    try {
        user = req.decoded.id;
        item = req.body.item;
        qty = req.body.qty;

        if (user && ObjectId.isValid(item) && qty) {
            const itemObj = await Item.findById(item).exec();
            if (itemObj.qty > 0) {
                //Call for price caculation
                const cart = await Cart.create({
                    item: item,
                    quantity: qty,
                    price: price
                });
                res.status(200).json({
                    success: true,
                    data: cart
                });

            } else {
                const items = await Item.find({ item: itemObj.item, qty: { "$gte": 0 }, expire: { "$lt": new Date() } }).sort('price').exec();
                price = items[0].price;

                const cart = await Cart.create({
                    item: items[0]._id,
                    quantity: qty,
                    price: price
                });
                res.status(200).json({
                    success: true,
                    data: cart
                });

            }
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

async function updateCart(req, res) {
    try {
        user = req.decoded.id;
        cart = req.body.cart;
        qty = req.body.qty;

        if (user && ObjectId.isValid(cart)) {

            //Call to calculate price
            const cartObj = await Cart.findOneAndUpdate(cart, { quantity: qty, price: price }).exec();
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

async function deleteCart(req, res) {

    try {
        user = req.decoded.id;
        cart = req.body.cart;

        if (user && ObjectId.isValid(cart)) {
            const cartObj = await Cart.findByIdAndDelete(cart).exec();
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

module.exports = { getCart, addToCart, deleteCart, updateCart }