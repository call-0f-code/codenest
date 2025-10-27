
import { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useMembers } from "@/hooks/useMember";

const ForgotPassword = ({ setIsLogin, setShowForgotPassword }) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetpassword, verifyotp, forgotpassword } = useMembers();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    forgotpassword.mutate(email, {
      onSuccess: () => {
        setStep("otp");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    verifyotp.mutate(
      { email, otp: userOtp },
      {
        onSuccess: () => {
          setStep("reset");
        },
      }
    );
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const password = newPassword;
    resetpassword.mutate(
      { password },
      {
        onSuccess: () => {
          setShowForgotPassword(false);
          setIsLogin(true);
        },
      }
    );
  };

  const goBack = () => {
    if (step === "otp") setStep("email");
    else if (step === "reset") setStep("otp");
    else setShowForgotPassword(false);
  };

  return (
    <div className="space-y-6 w-full flex flex-col justify-center">
      {/* Back Button */}
      <button
        type="button"
        onClick={goBack}
        className="flex items-center gap-2 text-xs font-bold text-[#C1502E] hover:underline"
      >
        <ArrowLeft className="h-5 w-5" />
        {step === "email" ? "Back to Login" : "Back"}
      </button>

      {step === "email" && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
              EMAIL ADDRESS
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
            <p className="text-xs text-[#2C1810]/80 dark:text-[#F5E6D3]/80">
              We'll send a verification code to this email
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate_y-1 bg-[#2C1810] dark:bg-[#F5E6D3]"
            />
            <button
              type="submit"
              disabled={setIsLoading}
              className="relative h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#C1502E] dark:bg-[#C1502E] text-sm font-black text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin border-2 border-[#F5E6D3] border-t-transparent rounded-full" />
              <span>SENDING...</span>
            </>
          ) : (
            <>
              <span>Send OTP</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
            </button>
          </div>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
              VERIFICATION CODE
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ""))}
                className="h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] px-4 text-lg text-center tracking-[0.5em] text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform"
                required
              />
            </div>
            <p className="text-xs text-[#2C1810]/80 dark:text-[#F5E6D3]/80">
              Enter the 6-digit code sent to {email}
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2C1810] dark:bg-[#F5E6D3]"
            />
            <button
              type="submit"
              className="relative h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#C1502E] dark:bg-[#C1502E] text-sm font-black text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Verify OTP</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center text-xs text-[#2C1810] dark:text-[#F5E6D3]">
            Didn’t receive code?{" "}
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-[#C1502E] hover:underline"
            >
              Resend
            </button>
          </div>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-[#2C1810] dark:text-[#F5E6D3]">
              NEW PASSWORD
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C1502E] z-10" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] pl-12 pr-4 text-sm text-[#2C1810] dark:text-[#F5E6D3] placeholder:text-[#2C1810]/40 dark:placeholder:text-[#F5E6D3]/40 focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-transform"
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
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2C1810] dark:bg-[#F5E6D3]"
            />
            <button
              type="submit"
              className="relative h-12 w-full border-4 border-[#2C1810] dark:border-[#F5E6D3] bg-[#C1502E] dark:bg-[#C1502E] text-sm font-black text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Reset Password</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
