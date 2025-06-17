const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');



app.use("/api/v1" , userRouter);
app.use("/api/v1" , blogRouter);

app.listen(PORT , ()=>{
    console.log(`Server is active on port : ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();

app.get('/' , (req ,res)=>{
    res.send("Welcome Brother");
})
