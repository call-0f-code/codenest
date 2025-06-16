const jwt = require('jsonwebtoken');
require("dotenv").config();


xports.isAuthenticated = async (req , res , next)=>{

    try{
        const token = req.cookies.token;

        

        if(!token || token == undefined){
            return res.status(401).json({
                success : false,
                message : "Token Missing"
            })
        }

        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            
            req.role = decode.role;
            
        }

        catch(e){
            return res.status(401).json({
                success : false,
                message : "Token is invalid"
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success : false,
            message : "Something went wrong while verifying token"
        })
    }
}