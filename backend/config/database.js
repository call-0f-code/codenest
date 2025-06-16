const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = ()=>{

    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("Db Connection Successful"))
    .catch((error)=>{
        console.log("issue in connection to db");
        console.log(error);
        process.exit(1);
    })
}

module.exports = dbConnect;