const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({     // creating a schema
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["superadmin", "admin", "user"],
        default:"user"
    }
},
{
    timestamps:true,   // adding timestamps to the schema
}
);

module.exports = mongoose.model("user", userSchema); //expotring the model