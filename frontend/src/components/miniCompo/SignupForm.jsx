import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, GraduationCap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { useMembers } from "@/hooks/useMember"

const SignupForm = ({setIsLogin}) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
  } = useForm()

  const {createNewMember} = useMembers();
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    fullName: '',
    passoutYear: ''
  });


 const onSubmitHandler = async (user) => {

    await createNewMember.mutate(
      { email: user.email, password: user.password, name: user.username, passoutYear: Number(user.passoutYear) },
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
              onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
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
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
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
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
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
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">PASSOUT YEAR</label>
          <div className="relative">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type={"text"}
              placeholder="eg. 2027"
              className="h-11 border-2 border-[#cfd5da] pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-[#2fbe84] rounded-none"
              {...register("passoutYear", { required: "Passout Year is required" })}
              onChange={(e) => setSignupForm({ ...signupForm, passoutYear: e.target.value })}
            />
            
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
