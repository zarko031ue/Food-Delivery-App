const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    id: { type: Number, required: true},
    resName: {type: String, required: false},
    name: { type: String, required: true},
    img: { type: String},
    price: { type: Number, required: true},
    qty: {type: Number, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
});

module.exports = mongoose.model('Cart', foodSchema )

               