const express = require("express");
const User = require("../model/User");
const verifyJWT = require("../utils/verifyJwt");

const router = express.Router();
router.post("/save-file", verifyJWT, async (req, res) => {
    try {
        const filesname = req.body.filesname;  
        const username = req.user.username;   

      
        const user = await User.findOne({ username: username });

        if (user) {
          
            user.uploads.push(filesname);
            
          
            await user.save();

        
            res.status(200).json({ message: "File uploaded successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
       
        console.error(error);
        res.status(500).json({ message: "An error occurred while uploading the file", error: error.message });
    }
});


module.exports = router;