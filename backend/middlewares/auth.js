const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the full payload to req.user so we can access both id and role
      req.user = decode;

      next();
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};
