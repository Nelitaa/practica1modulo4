const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  });

exports.addUser = catchAsync(async (req, res) => {
    req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
    
    
    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;
    
    res.status(200).json({
        status: "success",
            data: {
                user: newUser,
            },
        });
});

exports.getUserById = catchAsync(async (req, res) => {
    const foundUser = await User.findById(req.params.id);
    if (foundUser) {
      res.status(200).json({
        status: "success",
        data: {
          user: foundUser,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
  });

  exports.editUser = catchAsync(async (req, res) => {
    const updatedUser = req.body; 
    const foundUser = await User.findById(req.params.id);
    if(foundUser){
        let password 
        if(updatedUser.password){
            password =  crypto
            .createHash("sha256")
            .update(req.body.password)
            .digest("hex"); 
        }else {
          password = foundUser.password;
        }
        foundUser.userName = updatedUser.userName || foundUser.userName;
        foundUser.password = password;  
        foundUser.email = updatedUser.email || foundUser.email;
        const updatedUserInstance = await foundUser.save();
        res.status(200).json({
            status: "success",
            data: {
                user: updatedUserInstance,
            },
        });     
    }else{ 
        res.status(404).json({
        status: "not found",  
         });
    }   
});

exports.deleteUser = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if(foundUser){
      await User.deleteOne({_id: req.params.id})
      const users = await User.find()
      res.status(200).json({
          status: "success",
          data: {
              users,
          },
      });     
  }else{ 
     res.status(404).json({
      status: "not found",  
       });   
  }
});