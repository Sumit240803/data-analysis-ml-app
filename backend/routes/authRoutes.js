const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const router= express.Router()
require("dotenv").config();
router.post("/register" , async(req,res)=>{
    try {
        const data = req.body;
        const existingUser = await User.findOne({username : data.username});
        if(!existingUser){
            const user = new User({
                username : data.username,
                password  : data.password
            });
            await user.save();
            return res.status(200).json({"Message":"User Registered"});
        }else{
            return res.status(500).json({"Message" : "User Already Exists"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/login" , async(req,res)=>{
    try {
        const data = req.body;
        const user = await User.findOne({ username: data.username });
    
        if (user) {
            const payload = {
                username: user.username
            };
    
     
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    
          
            res.status(200).json({
                message: "Login successful",
                token: token
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
    
})

module.exports = router