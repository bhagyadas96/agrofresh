var logger = require('../config/logger');
const ItemList = require('../models/itemList');
const item = require('../models/item');

const Cart = require('../models/cart');
const uploadUtil = require('../util/_newsfeedUpload');

async function getFromCart(req, res) {
    try {

        user = req.decoded.id;
        item = req.body.item;
        quantity = req.body.quantity;
        // price = req.body.price;
        const cartitem = await ItemSchema.findById(item).exec();

        if (cartitem.metric = 0) {
            cartitem.price = cartitem.price * cartitem.quantity;
        } else {
            cartitem.price = (cartitem.price * cartitem.quantity) / 1000;
        }

        if (cartitem.quantity != 0) {
            const cart = await Cart.create({
                customer: customer,
                item: item,
                metric: metric,
                quantity: quantity,
                price: price
            });

        } else if (cartitem.quantity = 0) {
            const items = await cartitem.find({ item: item }).sort('price');
            for (i = 0; i < items.length; i++) {
                if (cartitem.quantity != 0 && cartitem.item == item) {
                    cartitem.price = items[0];


                }


            }
        }


        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        logger.error(error.message);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

exports.getFromCart = getFromCart;