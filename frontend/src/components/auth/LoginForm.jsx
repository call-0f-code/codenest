import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useMembers } from "@/hooks/useMember";
import { globalToast } from "@/utils/toast";

const LoginForm = ({ setIsLogin, setShowForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useMembers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          globalToast.success("Login Successfull");
          setIsLoading(false);
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
      className="space-y-5 h-[420px] flex flex-col justify-center"
    >
      <div className="space-y-2">
        <label className="font-orbitron text-xs font-bold tracking-wider text-black dark:text-white">
          EMAIL
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black dark:text-white" />
          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] pl-10 pr-4 font-orbitron text-sm text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] dark:placeholder:text-[#6b7a8a] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-orbitron text-xs font-bold tracking-wider text-black dark:text-white">
          PASSWORD
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black dark:text-white" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] pl-10 pr-12 font-orbitron text-sm text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] dark:placeholder:text-[#6b7a8a] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
            required
            minLength={8}
            maxLength={64}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$"
            title="Password must be 8–64 characters long, include uppercase, lowercase, a number, and a special character."
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6b72] dark:text-[#8b96a5] hover:text-[#3dd68c] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="font-orbitron text-xs text-[#3dd68c] hover:text-[#2fbe84] transition-colors"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="relative h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c17d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin border-2 border-[#1a1f2e] border-t-transparent rounded-full" />
              <span>AUTHENTICATING...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <div className="text-center font-orbitron text-xs text-black dark:text-white">
        New here?{" "}
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="text-[#3dd68c] hover:text-[#2fbe84] transition-colors"
        >
          Create an account
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
