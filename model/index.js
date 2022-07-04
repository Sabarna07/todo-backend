const mongoose = require("mongoose")

const BehaviourSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Behaviours",BehaviourSchema)