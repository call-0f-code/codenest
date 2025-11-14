// frontend/src/components/auth/LoginForm.jsx

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useMembers } from "@/hooks/useMember";
import { globalToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLogin, setShowForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useMembers();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          globalToast.success("Login Successfull");
          setIsLoading(false);
          navigate('/dashboard');
        },
        onError: () => {
          setIsLogin(false);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full flex flex-col justify-center"
    >
      <div className="space-y-2">
        <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
          EMAIL
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] pl-12 pr-4 text-sm text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
          PASSWORD
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] pl-12 pr-12 text-sm text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform"
            required
            minLength={8}
            maxLength={64}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$"
            title="Password must be 8–64 characters long, include uppercase, lowercase, a number, and a special character."
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C1502E] hover:text-[#2C1810] dark:hover:text-[#F5E6D3] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm font-bold text-[#C1502E] hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2C1810] dark:bg-[#F5E6D3]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="relative h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#C1502E] dark:bg-[#C1502E] text-sm font-black text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin border-2 border-[#F5E6D3] border-t-transparent rounded-full" />
              <span>AUTHENTICATING...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>

      <div className="text-center text-xs font-bold text-[#2C1810] dark:text-[#F5E6D3] mt-4">
        New here?{" "}
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="text-[#C1502E] font-bold hover:underline"
        >
          Create an account
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
