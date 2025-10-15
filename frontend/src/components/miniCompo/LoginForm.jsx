import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useMembers } from "@/hooks/useMember"
import { Input } from "../ui/input"

function LoginForm({setIsLogin}) {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const {login} = useMembers();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const onSubmitHandler = async () => {

    await login.mutate(
      { email: loginForm.email, password: loginForm.password },
      {
          onSuccess: () => {
              globalToast.success("Login Successful");
          }
      }
    );
  }

  return (
    <div className="space-y-5">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">EMAIL</label>
          <div className="relative">
            <Mail className="pointeinputr-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type="email"
              placeholder="name@domain.com"
              className="h-11 border-2 border-[#cfd5da] pl-10 focus-visible:ring-2 focus-visible:ring-[#2fbe84] rounded-none"
              {...register("email", { required: "Email is required" })}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider text-[#5f6b72]">PASSWORD</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6b72]" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 pl-10 pr-48.5 focus-visible:ring-2 focus-visible:ring-[#2fbe84] border-2 border-[#cfd5da]"
              {...register("password", { required: "Password is required" })}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-1 text-right">
            <a className="text-xs text-[#5f6b72] underline underline-offset-4 hover:text-[#1a1c1e]">Forgot password?</a>
          </div>
        </div>

        {/* Submit with stronger offset block shadow */}
        <div className="relative group active:translate-x-[6px] active:translate-y-[6px] transition-transform duration-150">
          {/* Shadow layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[#1a1c1e] rounded-none transition-transform duration-150 group-active:translate-x-0 group-active:translate-y-0"
          />

          {/* Actual button */}
          <button
            type="submit"
            disabled={login.isPending}
            className="relative z-10 h-11 w-full bg-[#2fbe84] text-[#ffffff] font-semibold rounded-none border-2 border-[#1a1c1e] 
              shadow-[4px_4px_0_#1a1c1e] group-active:shadow-none transition-all duration-150"
          >
            <div>
              {login.isPending ? (
                <>
                    <div className="w-6 h-6 border-[3px] border-black border-t-transparent animate-spin"></div>
                    <span>AUTHENTICATING...</span>
                </>
                ) : (
                <>
                    <span>Log In →</span>
                </>
                )}
            </div>
          </button>
        </div>


        <div className="text-center text-xs text-muted-foreground">
          New here?{" "}
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="text-[#2fbe84] underline underline-offset-4 hover:text-[#1a1c1e]"
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

