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


 exports.addItem = items;