const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken")


exports.signup = async(req ,res) =>{
    try{
        
        
        const {username , email , password , role} = req.body;

        const exisitingUser = await User.findOne({email});

        if(exisitingUser){
            return res.status(400).json({
                success : false,
                message : "User Already Exist",
            })
        }

        
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success : false,
                message : "Error in hashing password",
            })
        }

       
        let user = await User.create({
            username , email , password:hashedPassword, role
        });

        return res.status(200).json({
            success : true,
            message : "User created succesfully",
            data : user
        });



    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "User cannot be registerd"
        })
    }
}


exports.login = async (req ,res)=>{

    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please fill all the deatils"
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User does not exist , create new one"
            })
        }

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };

        if(await bcrypt.compare(password , user.password)){
            let token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn : "2h",
            })

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            

            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                secure : process.env.NODE_ENV === "production",
                httpOnly : true,
                sameSite : "Lax"
            }

            res.cookie("token" , token , options).status(200).json({
                success : true,
                user:{
                    id : user._id,
                    email : user.email,
                    role : user.role,
                },
                message : "User logged in succesfully ",
            })
        }
        else{
            return res.status(403).json({
                success : false,
                message : "Password does not match"
            })
        }

        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Login error"
        })
    }
}

exports.logout = async (_ , res) =>{

    try{
        return res.status(200).cookie("token" , "" , {maxAge : 0}).json({
            success : true,
            message :"User Logout succesful"
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Logout Failed"
        })
    }

}

const createToken = (user)=>{
    return jwt.sign(
        {id : user._id , username : user.useranme, role : user.role},
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )
};

exports.googleCallback = (req, res) => {
  const token = createToken(req.user);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: 'Lax',
    maxAge: 86400000,
  });

  res.redirect(process.env.CLIENT_HOME_URL);
};

exports.getMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally fetch fresh user data:
    const user = await User.findById(decoded.id).select("-password");
    return res.json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


