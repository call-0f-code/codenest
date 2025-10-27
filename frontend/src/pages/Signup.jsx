// frontend/src/pages/Signup.jsx

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import ForgotPassword from "@/components/auth/ForgotPassword";
import GeometricBackground from "@/components/common/GeometricBackground";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5E6D3] dark:bg-[#2C1810] transition-colors duration-300 flex items-center justify-center p-6">
      <GeometricBackground />
      <div className="w-full max-w-md relative">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="inline-flex items-center gap-3 font-black text-3xl text-[#2C1810] dark:text-[#F5E6D3] tracking-tight">
            <div className="bg-[#C1502E] p-3 border-4 border-black dark:border-[#F5E6D3] rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]">
              {/* You can put your logo icon here */}
              <span className="text-[#F5E6D3]">&lt;&gt;</span>
            </div>
            CALL OF CODE
          </h1>
          
        </div>

        {/* Form Card */}
        <div className="bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] shadow-[12px_12px_0px_0px_rgba(193,80,46,1)] dark:shadow-[12px_12px_0px_0px_rgba(245,230,211,1)] p-8">
          
          {/* Toggle / Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => { setIsLogin(true); setShowForgotPassword(false); }}
              className={`flex-1 py-3 font-black border-4 border-black dark:border-[#F5E6D3] transition-all ${
                isLogin && !showForgotPassword
                  ? "bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]"
                  : "bg-transparent text-[#2C1810] dark:text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => { setIsLogin(false); setShowForgotPassword(false); }}
              className={`flex-1 py-3 font-black border-4 border-black dark:border-[#F5E6D3] transition-all ${
                !isLogin && !showForgotPassword
                  ? "bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]"
                  : "bg-transparent text-[#2C1810] dark:text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1"
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Form Body */}
          <div className="transition-all duration-300">
            {showForgotPassword ? (
              <ForgotPassword
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
        </div>

      </div>
    </main>
  );
};

export default AuthPage;
