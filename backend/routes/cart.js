const express = require("express");
const checkAuth = require("../middleware/check-auth");
const CartController = require('../controlers/cart')

const router = express.Router();

router.post("", checkAuth, CartController.postFoodItems);

router.get("", CartController.getFoodItems );

router.delete("", CartController.deleteAllItems);

router.delete("/:id", CartController.deleteOneItem);

module.exports = router;
