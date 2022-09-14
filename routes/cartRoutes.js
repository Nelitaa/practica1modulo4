const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();

cartRouter
    .route("/")
    .all(authController.protect)
    .post(cartController.addProduct);

cartRouter
    .route("/:id")
    .all(authController.protect)
    .delete(cartController.deleteProduct);
    
module.exports = cartRouter;