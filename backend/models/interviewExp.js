const mongoose = require('mongoose');

const interviewExpSchema = new mongoose.Schema(
    {
        company : {
            type : String,
            required : true
        },
        role : {
            type : String,
            required : true
        },
        candidate : {
            type : String,
            required : false
        },
        verdict : {
            type : String,
            enum : ["Selected" , "Rejected" , "Pending"]
        },
        content : {
            type : String,
            required : true
        },
        

    }
);

module.exports = mongoose.model("Interview" , interviewExpSchema);
