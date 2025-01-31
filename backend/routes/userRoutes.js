const express = require("express");
const User = require("../model/User");
const verifyJWT = require("../utils/verifyJwt");
const Env = require("../model/Enviornments")
const userRouter = express.Router();
userRouter.post("/save-file", verifyJWT, async (req, res) => {
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

userRouter.get("/env", async (req, res) => {
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
  
userRouter.post("/create-env" , async(req,res)=>{
  try {
    const user = req.session.user;
    
      if (!user) {
        return res.status(401).json({ message: "User is not authenticated" });
      }
  
      const id = user.sub;
      const existingUser = await User.findOne({ googleId: id });
      const { name, description } = req.body;
      console.log(req.body);
      if (!name || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const env = new Env({name:name,description:description});
      await env.save();
      existingUser.enviornments.push(env._id)
      await existingUser.save();
      res.status(201).json({ message: "Environment Created", env: env });
  } catch (error) {
    console.error("Error creating environment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

userRouter.post("/env-id", async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const { envId } = req.body;

    const env = await Env.findById(envId);
    if (!env) {
      return res.status(404).json({ "Message": "Env not found" }); // Add return here
    }

    return res.status(200).json({ env });
  } catch (error) {
    console.error(error);  // Log error for better debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = userRouter;