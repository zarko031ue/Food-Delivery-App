const Order = require('../models/order');

exports.postOrder =  (req, res, next) => {
    const order = new Order ({
        orderTime: req.body.date,
        orderedItems: req.body.orderedItems
    });
    console.log(order)
    order.save();
    res.status(201).json({
        message: 'Your order has been placed successfully!',
        data: order
    })
}