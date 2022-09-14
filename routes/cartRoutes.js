const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();

cartRouter
    .route("/")
    .all(authController.protect)
    .post(cartController.addProductCart);

cartRouter
    .route("/:id")
    .all(authController.protect)
    //.delete(cartController.deleteProductCart);
    
module.exports = cartRouter;