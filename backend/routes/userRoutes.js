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

router.get("/env", async (req, res) => {
    try {
      const user = req.session.user;
  
      if (!user) {
        return res.status(401).json({ message: "User is not authenticated" });
      }
  
      const id = user.sub;
      const existingUser = await User.findOne({ googleId: id }).populate(
        "enviornments",
        "name description"
      );
  
      if (existingUser) {
        res.status(200).json({ env: existingUser.enviornments });
      } else {
        res.status(404).json({ message: "User not found or no environments" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;