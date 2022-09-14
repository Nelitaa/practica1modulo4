const fs = require("fs");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.addProductCart = catchAsync(async (req, res) => {
    if (!req.user){
        return res.status(404).json({
            status: "not found",
          });
    }
    const product = await Product.findById(req.body.productId);
    if(!product){
        return res.status(404).json({
            status: "not found",
          });
    }
    let currentCart = await Cart.findOne({
        user: req.user._id,
        status: 'PENDING'

    })
   if(currentCart){
        const productIndex = currentCart.products.findIndex((product) => product.productId.toString() ===  req.body.productId);
        if (productIndex > -1) {
            currentCart.products[productIndex].quantity = currentCart.products[productIndex].quantity + parseInt(req.body.quantity);
           currentCart.totalPrice = currentCart.products.reduce(((a,b) => a + (b.quantity*b.price)), 0)
            const cart = await currentCart.save();
           res.status(200).json({
            status: "success",
                data: {
                    cart: cart,
                },
            });
        } else {
           currentCart.products.push({ productId: req.body.productId, quantity: req.body.quantity, price: product.price });
           const cart = await currentCart.save();
           res.status(200).json({
            status: "success",
                data: {
                    cart: cart,
                },
            });
        };
    }else{
        const newCart = await Cart.create({
            user: req.user._id,
            status: 'PENDING',
            products: [
                { productId: req.body.productId, quantity: req.body.quantity, price: product.price }
            ] 
        })
        res.status(200).json({
        status: "success",
            data: {
                cart: newCart,
            },
         });
    }
});

exports.deleteProductCart = catchAsync(async (req, res) => {
        if (!req.user){
            return res.status(404).json({
                status: "User not found",
              });
        }
        const product = await Product.findById(req.params.productId);
        if(!product){
            return res.status(404).json({
                status: "not found",
              });
        }
        let currentCart = await Cart.findOne({
            user: req.user._id,
            status: 'PENDING'
    
        })
       if(currentCart){
            const productIndex = currentCart.products.findIndex((product) => product.productId.toString() ===  req.params.productId);
            if (productIndex > -1) {
                currentCart.products.splice(productIndex, 1);
                currentCart.totalPrice = currentCart.products.reduce(((a,b) => a + (b.quantity*b.price)), 0)
                const cart = await currentCart.save();               
                res.status(200).json({
                status: "success",
                    data: {
                        cart: cart,
                    },
                });

            } else {
                res.status(404).json({
                    status: "Product not found",
                  });
            };
        }else{
            res.status(404).json({
                status: "Cart not found",
              });
        }
    });
exports.payCart = catchAsync(async (req, res) => {
    if (!req.user){
        return res.status(404).json({
            status: "User not found",
            });
    }
    let currentCart = await Cart.findOne({
        user: req.user._id,
        status: 'PENDING'

    })
    if(currentCart){
        if (currentCart.products.length>0) {
            currentCart.status="PAID";
            const cart = await currentCart.save();               
            res.status(200).json({
            status: "success",
                data: {
                    cart: cart,
                },
            });
        } else {
            res.status(404).json({
                status: "cart empty",
                });
        };
    }else{
        res.status(404).json({
            status: "Cart not found",
            });
    }
});
