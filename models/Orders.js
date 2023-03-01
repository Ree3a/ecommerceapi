const mongoose = require('mongoose');


const ordersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    status : {
        type: String,
        default: "Order started"
    }
});

module.exports = mongoose.model('Orders', ordersSchema);

