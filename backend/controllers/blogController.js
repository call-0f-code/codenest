const Blog = require("../models/blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, author, content, tags } = req.body;

    const blog= new Blog({
        title , author , content , tags
    });
    const savedBlog = await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog Created Succesfully",
      data: savedBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to create new blog",
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      success: true,
      data: blogs,
      message: "ALl Blogs Fetched Succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to get all the blogs",
    });
  }
};

//pending : create update blog controlere

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: deletedBlog,
      message: "Blog was deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succces: false,
      error: err.message,
      message: "Unable to delete the Blog",
    });
  }
};

//gettin  a single blog 

exports.getBlog = async (req ,res)=>{
  try{
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      success : true,
      data : blog,
      message : "Specific Blog was fetched"
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      succces : false,
      error : err.message,
      message : "Unable to get that blog"
    })
  }
};

// exports.likeBlog = async (req, res) => {
//   try {
//     const blogId = req.params.blogId;

//     // Check if already liked
//     const alreadyLiked = await BlogLike.findOne({
//       blog: blogId,
//       user: req.user.id,
//     });
//     if (alreadyLiked)
//       return res.status(400).json({ message: "You already liked this blog" });

//     const like = new BlogLike({ blog: blogId, user: req.user.id });
//     await like.save();

//     res.status(200).json({ message: "Blog liked" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to like blog", error });
//   }
// };

// exports.commentOnBlog = async (req, res) => {
//   try {
//     const blogId = req.params.blogId;
//     const { content } = req.body;

//     const comment = new BlogComment({
//       blog: blogId,
//       user: req.user.id,
//       content,
//     });

//     await comment.save();
//     res.status(201).json({ message: "Comment added", comment });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to comment on blog", error });
//   }
// };
