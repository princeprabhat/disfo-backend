const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    fullName:{
        type:String,
        maxlength:50,
        default:"",
    },
    username:{
        type:String,
        maxlength:25,
        unique:true,
        required:true,
    },
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      }
},
);
const Users = mongoose.model("Users",userSchema);

module.exports.Users = Users