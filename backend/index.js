const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
require("dotenv").config();
require('./google-config/passport')(passport);


const PORT = process.env.PORT || 4000;


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());


const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const interveiwExpRouter = require('./routes/interviewExp');
const moduleRouter = require('./routes/module');



app.use("/api/v1" , userRouter);
app.use("/api/v1" , blogRouter);
app.use("/api/v1" , interveiwExpRouter);
app.use("/api/v1" , moduleRouter);

app.listen(PORT , ()=>{
    console.log(`Server is active on port : ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();

app.get('/' , (req ,res)=>{
    res.send("Welcome Brother");
})
