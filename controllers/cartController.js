const fs = require("fs");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

exports.addProductCart = catchAsync(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        status: "success",
            data: {
                product: newProduct,
            },
        });
});

exports.deleteProductCart = catchAsync(async (req, res) => {
    const foundProduct = await Product.findById(req.params.id);
    if(foundProduct){
        await Product.deleteOne({_id: req.params.id})
        const products = await Product.find()
        res.status(200).json({
            status: "success",
            data: {
                products,
            },
        });     
    }else{ 
       res.status(404).json({
        status: "not found",  
         });   
    }
});

