const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

exports.isAdmin = async(req , res , next) =>{
    try{
        
        if(req.role !== "admin"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for admin",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "User role is not matching",
        })
    }
}