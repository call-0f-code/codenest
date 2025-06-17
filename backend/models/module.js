const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionName : {
        type : String,
        required : true
    },
    difficulty : {
        type : String,
        enum : ["Easy" , "Medium" , "Hard"]
    },
    link : {
        type : String,
        required : true
    }
} , {_id : false});

const moduleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    questions : [questionSchema],
    createdBy : {
        type : String,
        required : false
    }

} , {timestamps : true});

module.exports = mongoose.model("Module" , moduleSchema);