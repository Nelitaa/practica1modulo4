const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync (async (req, res) => {
   const products = await Product.find();
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
});

exports.addProduct = catchAsync(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        status: "success",
            data: {
                product: newProduct,
            },
        });
});

exports.getProductById = catchAsync(async (req, res) => {
    const foundProduct = await Product.findById(req.params.id);
    if(foundProduct){
        res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });     
    } else{
        res.status(404).json({
        status: "not found",  
         }); 
    }  
});

exports.editProduct = catchAsync(async (req, res) => {
    const updatedProduct = req.body; 
    const foundProduct = await Product.findById(req.params.id);
    if(foundProduct){
        foundProduct.productName = updatedProduct.productName || foundProduct.productName;
        foundProduct.price = updatedProduct.price || foundProduct.price;
        const updatedProductInstance = await foundProduct.save();
        res.status(200).json({
            status: "success",
            data: {
                product: updatedProductInstance,
            },
        });     
    }else{ 
        res.status(404).json({
        status: "not found",  
         });
    }   
});

exports.deleteProduct = catchAsync(async (req, res) => {
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