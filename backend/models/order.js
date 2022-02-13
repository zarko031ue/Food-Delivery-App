const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderTime: {type: Date},
  orderedItems: {type: Object}
});

module.exports = mongoose.model("Order", orderSchema);

