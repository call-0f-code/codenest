import { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft, EyeOff, Eye } from "lucide-react";
import { useMembers } from "@/hooks/useMember";

const ForgotPasswordForm = ({ setIsLogin, setShowForgotPassword }) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetpassword, verifyotp, forgotpassword } = useMembers();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    forgotpassword.mutate(email, {
      onSuccess: () => {
        setStep("otp");
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
    <div className="space-y-5 h-[420px] flex flex-col ">
      {/* Back Button */}
      <button
        type="button"
        onClick={goBack}
        className="flex items-center gap-2 font-orbitron text-xs text-[#3dd68c] hover:text-[#2fbe84] transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        {step === "email" ? "Back to Login" : "Back"}
      </button>

      {/* Step 1: Email */}
      {step === "email" && (
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div className="space-y-2">
            <label className="font-orbitron text-xs font-bold tracking-wider text-black dark:text-white">
              EMAIL ADDRESS
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
            <p className="font-orbitron text-xs text-[#5f6b72] dark:text-[#8b96a5]">
              We'll send a verification code to this email
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <button
              type="submit"
              disabled={forgotpassword.isPending}
              className="relative h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c17d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {forgotpassword.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin border-2 border-[#1a1f2e] border-t-transparent rounded-full" />
                  <span>SENDING...</span>
                </>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Step 2: OTP */}
      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="space-y-2">
            <label className="font-orbitron text-xs font-bold tracking-wider text-black dark:text-white">
              VERIFICATION CODE
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ""))}
                className="h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] px-4 font-orbitron text-lg text-center tracking-[0.5em] text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] dark:placeholder:text-[#6b7a8a] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
                required
              />
            </div>
            <p className="font-orbitron text-xs text-[#5f6b72] dark:text-[#8b96a5]">
              Enter the 6-digit code sent to {email}
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <button
              type="submit"
              disabled={verifyotp.isPending}
              className="relative h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c17d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {verifyotp.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin border-2 border-[#1a1f2e] border-t-transparent rounded-full" />
                  <span>VERIFYING...</span>
                </>
              ) : (
                <>
                  <span>Verify OTP</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <div className="text-center font-orbitron text-xs text-black dark:text-white">
            Didn't receive code?{" "}
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-[#3dd68c] hover:text-[#2fbe84] transition-colors"
            >
              Resend
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-2">
            <label className="font-orbitron text-xs font-bold tracking-wider text-black dark:text-white">
              NEW PASSWORD
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black dark:text-white" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] pl-10 pr-4 font-orbitron text-sm text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] dark:placeholder:text-[#6b7a8a] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
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
            <p className="font-orbitron text-xs text-[#5f6b72] dark:text-[#8b96a5]">
              Must be 8–64 characters with uppercase, lowercase, number, and special character
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <button
              type="submit"
              disabled={resetpassword.isPending}
              className="relative h-12 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c17d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {resetpassword.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin border-2 border-[#1a1f2e] border-t-transparent rounded-full" />
                  <span>RESETTING...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
