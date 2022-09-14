const express = require("express");
const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();

userRouter
    .route("/")
    //.all(authController.protect)
    .get(userController.getAllUsers)
    .post(userController.addUser);

userRouter
    .route("/:id")
    .all(authController.protect)
    .get(userController.getUserById)
    .put(userController.editUser)
    .delete(userController.deleteUser);
    
module.exports = userRouter;
