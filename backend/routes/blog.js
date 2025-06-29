const express = require('express');
const router = express.Router();

const {createBlog , getAllBlogs , deleteBlog , getBlog} = require("../controllers/blogController");

const {isAuthenticated , isAdmin} = require("../middlewares/auth");


router.post('/admin/createBlog' , isAuthenticated , isAdmin , createBlog);
router.get('/getBlogs' , isAuthenticated , getAllBlogs);
router.get('/getBlog/:id' , isAuthenticated , getBlog);
router.delete('/admin/deleteBlog/:id' , isAuthenticated , isAdmin , deleteBlog);
//pending : routes for liking the blog and commenting on it


module.exports = router;