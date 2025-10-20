import { useState } from "react";
import BrandingSection from "@/components/miniCompo/BrandingSection";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPassword";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-[#e8eaed] dark:bg-[#1a1f2e] transition-colors duration-300">
      <header className="mx-auto max-w-7xl px-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-4 py-2 font-orbitron text-sm font-bold text-[#1a1f2e]">
              CALL OF CODE
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-2 text-[#2a2d35] dark:text-[#c5d1de] hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] px-6 py-2 font-orbitron text-sm text-[#2a2d35] dark:text-[#c5d1de] hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors">
              Home
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <BrandingSection />

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <section className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6 md:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-b-[80px] border-l-[80px] border-b-[#3dd68c]/20 border-l-transparent"
              />

              <div className="mb-6 flex items-center justify-center">
                <div className="relative flex w-64 items-center justify-between overflow-hidden border-2 border-[#2a2d35] dark:border-[#3a4a5f] font-orbitron text-sm font-bold">
                  <div
                    className={`absolute left-0 top-0 h-full w-1/2 bg-[#3dd68c] transition-transform duration-500 ease-out ${
                      !isLogin ? "translate-x-full" : "translate-x-0"
                    }`}
                  />
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`relative z-10 flex-1 py-3 text-center transition-colors duration-300 ${
                      isLogin
                        ? "text-[#1a1f2e]"
                        : "text-[#2a2d35] dark:text-[#8b96a5]"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`relative z-10 flex-1 py-3 text-center transition-colors duration-300 ${
                      !isLogin
                        ? "text-[#1a1f2e]"
                        : "text-[#2a2d35] dark:text-[#8b96a5]"
                    }`}
                  >
                    Signup
                  </button>
                </div>
              </div>

               {showForgotPassword && (
                <div className="mb-6">
                  <h2 className="font-orbitron text-2xl font-bold text-center text-[#1a1f2e] dark:text-white">
                    Reset Password
                  </h2>
                </div>
              )}

              <div className="transition-all duration-300">
                {showForgotPassword ? (
                  <ForgotPasswordForm
                    setIsLogin={setIsLogin}
                    setShowForgotPassword={setShowForgotPassword}
                  />
                ) : isLogin ? (
                  <LoginForm 
                    setIsLogin={setIsLogin}
                    setShowForgotPassword={setShowForgotPassword}
                  />
                ) : (
                  <SignupForm setIsLogin={setIsLogin} />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
