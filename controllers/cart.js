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
        metric = req.body.metric;

        if (user && ObjectId.isValid(item) && qty) {
            const itemObj = await Item.findById(item).exec();

            if (metric == "gm") {
                qty = qty / 1000;
            }
            if (itemObj.qty > 0 && itemObj.qty >= qty) {
                price = priceCalculate(itemObj.price, qty);
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
                price = priceCalculate(items[0].price, qty);

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

function priceCalculate(price, qty) {
    if (metric == "kg")
        totPrice = price * qty;
    return totPrice;
}

async function updateCart(req, res) {
    try {
        user = req.decoded.id;
        cart = req.body.cart;
        qty = req.body.qty;
        metric = req.body.metric;

        if (user && ObjectId.isValid(cart)) {

            const cartObj = await Cart.findById(cart).exec();
            const itemObj = await Item.findById(cartObj.item).exec();

            if (metric == "gm") {
                qty = qty / 1000;
            }

            if (itemObj.qty > 0 && itemObj.qty >= qty) {

                price = priceCalculate(itemObj.price, qty);
                cartObj.price = price;
                cartObj.qty = qty;
                cartObj.metric = metric;
                await cartObj.save();
                res.status(200).json({
                    success: true,
                    data: cartObj
                });

            } else {

                const items = await Item.find({ item: itemObj.item, qty: { "$gte": 0 }, expire: { "$lt": new Date() } }).sort('price').exec();
                price = priceCalculate(items[0].price, qty);
                cartObj.item = items[0]._id;
                cartObj.price = price;
                cartObj.qty = qty;
                cartObj.metric = metric;
                await cartObj.save();
                res.status(200).json({
                    success: true,
                    data: cartObj
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