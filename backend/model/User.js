const mongoose = require("mongoose")

const UserSchema =new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  picture: String,
  enviornments : [{type : mongoose.Schema.Types.ObjectId,
    ref : 'Enviornments'
  }]
},{
    timestamps : true
})


module.exports = mongoose.model("User" , UserSchema);