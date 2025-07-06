const express = require('express');
const router = express.Router();
const passport = require('passport');

const {signup , login , logout , getMe , googleCallback  } = require("../controllers/auth");


router.post('/signup' , signup);
router.post('/login', login);
router.get('/logout' , logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);



//new me endpoint 
router.get("/me" , getMe);

module.exports = router;