const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
require("dotenv").config();
require('./google-config/passport')(passport);


const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:5173', // For local frontend development
  'https://codenest-lyart.vercel.app' // YOUR VERCELL FRONTEND URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // and allow your specified origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // IMPORTANT: Allows cookies (like session IDs) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow headers
}));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());


const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const interveiwExpRouter = require('./routes/interviewExp');
const moduleRouter = require('./routes/module');
const progressRouter = require('./routes/progress');




app.use("/api/v1" , userRouter);
app.use("/api/v1" , blogRouter);
app.use("/api/v1" , interveiwExpRouter);
app.use("/api/v1" , moduleRouter);
app.use("/api/v1/progress" , progressRouter);


app.listen(PORT , ()=>{
    console.log(`Server is active on port : ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();



app.get('/' , (req ,res)=>{
    res.send("Welcome Brother");
})
