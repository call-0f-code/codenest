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
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login` , user , {
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
       const handleGoogleLogin = () => {
      window.open(`${import.meta.env.VITE_API_BASE_URL}/google`,"_self");
    };

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

        <Button
          type="button"
          variant="outline"
          className="h-12 border-gray-300 hover:border-gray-400"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google 
        </Button>
      </form>

      

      
     
    </div>
  );
}

export default LoginForm;
