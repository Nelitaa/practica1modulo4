const mongoose = require ("mongoose");
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    status: {
        type:String,
        required:true,
        enum:["PENDING", "PAID"]
    },
    products: [{
        _id: false,
        productId: {
            type: mongoose.Types.ObjectId,
            required:true,
            ref: 'Product'
        },
        price: Number,
        quantity: Number
    }],
    totalPrice: Number
});

const Cart =mongoose.model("Cart", cartSchema);
module.exports = Cart;