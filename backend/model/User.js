const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UserSchema =new mongoose.Schema({
    username : {type : "String" , unique : true},
    password : {type : "String"},
    uploads : [
        {type : "String"}
    ]
},{
    timestamps : true
})

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){

        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
    }
    next();
    
});
module.exports = mongoose.model("User" , UserSchema);