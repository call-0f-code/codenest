const express = require('express');
const router = express.Router();

const {signup , login , logout , getMe } = require("../controllers/auth");

router.post('/signup' , signup);
router.post('/login', login);
router.get('/logout' , logout);

//new me endpoint 
router.get("/me" , getMe);

module.exports = router;