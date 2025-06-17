const express = require('express');
const router = express.Router();

const {createInterviewExp , getAllInterviewExp , deleteInterviewExp} = require("../controllers/interviewExpController");

const {isAuthenticated , isAdmin} = require("../middlewares/auth");


router.post('/admin/createInterviewExp' , isAuthenticated , isAdmin , createInterviewExp);
router.get('/getInteviewExp' , isAuthenticated , getAllInterviewExp);
router.delete('/admin/deleteInterviewExp/:id' , isAuthenticated , isAdmin , deleteInterviewExp);
//pending : routes for updating the interview exp .


module.exports = router;