import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'

const SignupForm = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {register , handleSubmit , formState : {errors}} = useForm();

    const onSubmitHandler = async(user) =>{
        try{
          const res = await axios.post("http://localhost:3000/api/v1/signup" , user , {
            headers : {"Content-Type" : "application/json"},
            withCredentials : true
          });
          console.log(res);
          if(res.data.success){
            alert(res.data.message);
            navigate("/")
          }
        }
        catch(err){
          alert("Singup Failed");
        }
     
    }


  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Start your coding journey today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="space-y-2">
          {/* <Label htmlFor="fullName">Full Name</Label> */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your username"

              className="pl-10 h-12"
              {...register("username" , {required : "Username is required"})}
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="email">Email</Label> */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 h-12"
              {...register("email" , {required : "email is required"})}
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="password">Password</Label> */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="pl-10 pr-10 h-12"
              {...register("password" , {required : "Password is required"})}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="confirmPassword">Confirm Password</Label> */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input

              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10 pr-10 h-12"
              {...register("confirmPassword" , {required : "Confir Password is reuqired"})}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        

        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Create Account
        </button>
      </form>

      
    </div>
  );
};

export default SignupForm;