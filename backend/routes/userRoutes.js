const express = require("express");
const User = require("../model/User");

const router = express.Router();

router.post("/save-file" ,async (req,res)=>{
    try {
        const data = req.body;
        const username = data.username;
        const user = await User.findOne({username: username});
        
    } catch (error) {
        
    }
})