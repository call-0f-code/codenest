
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, GraduationCap, ArrowRight } from "lucide-react";
import { useMembers } from "@/hooks/useMember";
import { globalToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passoutYear: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { createNewMember } = useMembers();
  const navigate = useNavigate();

  const passwordsMatch = formData.password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    createNewMember.mutate(
      {
        email: formData.email,
        password: formData.password,
        name: formData.username,
        passoutYear: new Date(formData.passoutYear),
      },
      {
        onSuccess: () => {
          globalToast.success("Member Sent for Approval");
          setIsLoading(false);
          navigate('/')
        },
        onError: () => {
          setIsLoading(false);
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
          FULL NAME
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] pl-12 pr-4 text-sm text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
          EMAIL
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
          CONFIRM PASSWORD
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              e.target.setCustomValidity(
                formData.password !== e.target.value ? "Passwords do not match." : ""
              );
            }}
            className={`h-12 w-full border-4 ${
              formData.password && confirmPassword && formData.password !== confirmPassword
                ? "border-red-600"
                : "border-[#2C1810] dark:border-[#F5E6D3]"
            } bg-[#F5E6D3] dark:bg-[#2C1810] pl-12 pr-12 text-sm text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform`}
            required
            minLength={8}
            maxLength={64}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
          PASSOUT YEAR
        </label>
        <div className="relative">
          <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
          <input
            type="number"
            placeholder="eg. 2027"
            value={formData.passoutYear}
            onChange={(e) => {
              const year = parseInt(e.target.value);
              const currentYear = new Date().getFullYear();
              if (year >= currentYear - 4 && year <= currentYear + 4) {
                setFormData({ ...formData, passoutYear: e.target.value });
              }
            }}
            min={new Date().getFullYear() - 4}
            max={new Date().getFullYear() + 4}
            className="h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] pl-12 pr-4 text-sm text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform"
            required
          />
        </div>
      </div>

      <div className="relative mt-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2C1810] dark:bg-[#F5E6D3]"
        />
        <button
          type="submit"
          disabled={isLoading || !passwordsMatch}
          className="relative h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#C1502E] dark:bg-[#C1502E] text-sm font-black text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin border-2 border-[#F5E6D3] border-t-transparent rounded-full" />
              <span>CREATING ACCOUNT...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>

      <div className="text-center text-xs font-bold text-[#2C1810] dark:text-[#F5E6D3] mt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className="text-[#C1502E] font-bold hover:underline"
        >
          Login here
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
