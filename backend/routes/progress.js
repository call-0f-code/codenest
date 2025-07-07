const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { getUserProgress, updateUserProgress } = require("../controllers/progressController");

router.get("/:moduleId", isAuthenticated, getUserProgress);
router.post("/:moduleId", isAuthenticated, updateUserProgress);

module.exports = router;
