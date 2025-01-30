const mongoose = require("mongoose")

const envSchema = new mongoose.Schema({
    name : {type : String},
    primaryfile : {type : String},
    files : [
        {type : String}
    ],
    description : {type : String}
},{
    timestamps : true
})

module.exports = mongoose.model("Enviornments",envSchema);