const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required  : function () {
            return !this.googleId;
        },
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : function () {
            return !this.googleId;
        }
    },
    role : {
        type : String,
        enum : ['user' , 'admin'] , default : 'user'
    },
    googleId : {
        type : String
    }
});

module.exports = mongoose.model("User" , userSchema);