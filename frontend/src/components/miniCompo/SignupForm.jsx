// import { useState } from "react";
// import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {useForm} from 'react-hook-form'
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// axios.defaults.withCredentials = true;
// const SignupForm = () => {

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {register , handleSubmit , formState : {errors}} = useForm();

//     const onSubmitHandler = async(user) =>{
//         try{
//           const res = await axios.post("http://localhost:3000/api/v1/signup" , user , {
//             headers : {"Content-Type" : "application/json"},
//             withCredentials : true
//           });
//           console.log(res);
//           if(res.data.success){
//             alert(res.data.message);
//             navigate("/dashboard")
//           }
//         }
//         catch(err){
//           alert("Singup Failed");
//         }
     
//     }

//     const handleGoogleLogin = () => {
//       window.open("http://localhost:3000/api/v1/google" ,"_self");
//     };


//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
//         <p className="text-gray-600">Start your coding journey today</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
//         <div className="space-y-2">
//           {/* <Label htmlFor="fullName">Full Name</Label> */}
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               type="text"
//               placeholder="Enter your username"

//               className="pl-10 h-12"
//               {...register("username" , {required : "Username is required"})}
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           {/* <Label htmlFor="email">Email</Label> */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               className="pl-10 h-12"
//               {...register("email" , {required : "email is required"})}
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           {/* <Label htmlFor="password">Password</Label> */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a password"
//               className="pl-10 pr-10 h-12"
//               {...register("password" , {required : "Password is required"})}
//             />
//             <Button
//               type="Button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//             </Button>
//           </div>
//         </div>

//         <div className="space-y-2">
//           {/* <Label htmlFor="confirmPassword">Confirm Password</Label> */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input

//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//               className="pl-10 pr-10 h-12"
//               {...register("confirmPassword" , {required : "Confir Password is reuqired"})}
//             />
//             <Button
//               type="Button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//             </Button>
//           </div>
//         </div>

        

//         <Button
//           type="submit"
//           className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
//         >
//           Create Account
//         </Button>


//         {/* Button For Google Sigin */}
//         <div className="grid grid-cols-2 gap-3">


//         <Button
//           type="button"
//           variant="outline"
//           className="h-12 border-gray-300 hover:border-gray-400"
//           onClick={handleGoogleLogin}
//         >
//           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//             <path
//               fill="currentColor"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="currentColor"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="currentColor"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//             />
//             <path
//               fill="currentColor"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//           Google 
//         </Button>
//         {/* <Button
//           type="button"
//           variant="outline"
//           className="h-12 border-gray-300 hover:border-gray-400"
//         >
//           <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.89 2.745a.36.36 0 01.083.355c-.091.381-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.125-2.6 7.441-6.209 7.441-1.212 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
//           </svg>
//           GitHub
//         </Button> */}
//       </div>

//       </form>

      
//     </div>
//   );
// };

// export default SignupForm;
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { useMembers } from "@/hooks/useMember"

const SignupForm = ({setIsLogin}) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
  } = useForm()

  const {createNewMember} = useMembers();
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    name: ''
  });


 const onSubmitHandler = async (user) => {

    e.preventDefault();
    createNewMember.mutate(
      { email: signupForm.email, password: signupForm.password, name: signupForm.name },
      {
          onSuccess: () => {
              globalToast.success("Signup Successful");
          }
      }

    );
    await navigate('/signup');
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">USERNAME</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type="text"
              placeholder="Enter your username"
              className="h-11 border-2 border-[#cfd5da] pl-10 focus-visible:ring-2 focus-visible:ring-[#2fbe84] rounded-none"
              {...register("username", { required: "Username is required" })}
              onChange={(e) => setSignupForm({ ...SignupForm, name: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">EMAIL</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11 border-2 border-[#cfd5da] pl-10 focus-visible:ring-2 focus-visible:ring-[#2fbe84] rounded-none"
              {...register("email", { required: "Email is required" })}
              onChange={(e) => setSignupForm({ ...SignupForm, email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">PASSWORD</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="h-11 border-2 border-[#cfd5da] pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-[#2fbe84] rounded-none"
              {...register("password", { required: "Password is required" })}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">CONFIRM PASSWORD</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="h-11 border-2 border-[#cfd5da] pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-[#2fbe84] rounded-none"
              {...register("confirmPassword", { required: "Confirm Password is required" })}
            />
            <button
              type="button"
              variant="ghost"
              size="icon"
              disabled={createNewMember.isPending}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit with offset block shadow */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] border-2 border-[#1a1c1eCC] rounded-none bg-[#1a1c1e]"
          />
          <div className="relative group active:translate-x-[6px] active:translate-y-[6px] transition-transform duration-150">
          {/* Shadow layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[#1a1c1e] rounded-none transition-transform duration-150 group-active:translate-x-0 group-active:translate-y-0"
          />

          {/* Actual button */}
          <button
            type="submit"
            className="relative z-10 h-11 w-full bg-[#2fbe84] text-[#ffffff] font-semibold rounded-none border-2 border-[#1a1c1e] 
              shadow-[4px_4px_0_#1a1c1e] group-active:shadow-none transition-all duration-150"
          >
            Create Account →
          </button>
        </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="text-[#2fbe84] underline underline-offset-4 hover:text-[#1a1c1e]"
          >
            Login here
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
