const fs = require("fs");
const models = require("../models");

exports.getAllProducts = async (req, res) => {
   const products = await models.Product.findAll();
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
};

exports.addProduct = async (req, res) => {
    let newProduct = models.Product.build(req.body);
    newProduct = await newProduct.save();
    res.status(200).json({
        status: "success",
            data: {
                product: newProduct,
            },
        });
};

exports.getProductById = async (req, res) => {
    const foundProduct = await models.Product.findByPk(req.params.id);
    if(foundProduct){
        res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });     
    } 
    res.status(404).json({
        status: "not found",  
    });   
}

exports.editProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`)
);
const { id } = req.params;
const updatedProduct = req.body; 

const foundProduct = products.find(p => p.id == id);
    if(foundProduct){
        const newProducts =  products.map( (product) => (product.id==id) ?  updatedProduct : product);
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(newProducts));
        return res.status(200).json({
            status: "success",
            data: {
                product: updatedProduct,
            },
        });     
    } 
    res.status(404).json({
        status: "not found",  
    });   
}

exports.deleteProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`)
);
const { id } = req.params;
const foundProduct = products.find(p => p.id == id);
    if(foundProduct){
        const newProducts =  products.filter( (product) => (product.id != id));
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(newProducts));
        return res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });     
    } 
    res.status(404).json({
        status: "not found",  
    });   
}