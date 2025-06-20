import { useState } from "react";
import BrandingSection from "../componenets/miniCompo/BrandingSection";
import SignupForm from "../componenets/miniCompo/SignupForm";
import LoginForm from "../componenets/miniCompo/LoginForm";
const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex">
      <BrandingSection />

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>
          {/* Form Content */}
          <div className="transition-all duration-300">
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Signup;
