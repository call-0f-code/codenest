import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import axios from "axios";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm() {

  const navigate = useNavigate();

  const {register , handleSubmit , formState : {errors}} = useForm();
  const [showPassword, setShowPassword] = useState(false);

   const onSubmitHandler = async (user) => {
      try{
        const res = await axios.post("http://localhost:3000/api/v1/login" , user , {
          headers : {"Content-Type" : "application/json"},
          withCredentials : true,
        });
        console.log(res);
        if(res.data.success){
          alert(res.data.message);
          navigate("/")
        }
      }
      catch(err){
        alert("Login failed");
      }
   }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Continue your DSA journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)}className="space-y-4">
        <div className="space-y-2">
          {/* <Label htmlFor="email">Email</Label> */}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Enter your email"
              className="pl-10 h-12"
              {...register("email" , {required : "Email is required"})}
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="password">Password</Label> */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10 h-12"
              {...register("password" , {required : "Password is required"})}
            />
            <Button
              type="Button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Sign In
        </Button>
      </form>

      

      
     
    </div>
  );
}

export default LoginForm;
