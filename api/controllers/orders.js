const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const newOrder = Order(req.body);
    await newOrder.save();
    res.send({message:"success"});
}

exports.getOrders = (req, res) => {
    Order.find({ userid: req.params.userid }).populate('items.item','title imageUrl price').then(orders => res.send(orders));
}