const express = require('express');

const OrderController = require('../controlers/order')

const router = express.Router();

router.post('', OrderController.postOrder);

module.exports = router;