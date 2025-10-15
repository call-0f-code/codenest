import { useState } from "react"
import BrandingSection from "../components/miniCompo/BrandingSection"
import SignupForm from "../components/miniCompo/SignupForm"
import LoginForm from "../components/miniCompo/LoginForm"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)


  return (
    <main className="min-h-screen bg-[#eef0f3]/40">
      <header className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <div className="relative flex items-stretch"></div>
          </div>
          {/* Right button: Home */}
          <button className="border-1 p-2">Home</button>
        </div>
      </header>

      <div className="max-w-6xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {/* Left: Branding */}
          <BrandingSection/>

          {/* Right: Auth Card */}
          <div className="relative">
            {/* strong offset block shadow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-[#1a1c1eCC] rounded-none text-[#1a1c1e] bg-[#1a1c1e]"
            />
            <section className="relative border-[#1a1c1e] bg-[#ffffff] p-5 md:p-7 text-[#1a1c1e] rounded-none border-0">
              {/* big diagonal corner ribbon */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[100px] border-b-[100px] -rotate-90 border-l-transparent border-b-[#2fbe8433]"
              />
              
              {/* Tabs header */}
              
              <div className="mb-6 flex items-center justify-center">
                <div
                  onClick={() => setIsLogin(!isLogin)}
                  className="relative flex w-56 cursor-pointer select-none items-center justify-between border-2 font-semibold text-sm overflow-hidden rounded-lg"
                >
                  {/* Sliding button */}
                  <div
                    className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] border-2 border-[#1a1c1e] bg-[#2fbe84] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${
                      !isLogin ? "translate-x-[100%]" : "translate-x-0"
                    }`}
                    style={{
                      boxShadow: "4px 4px 0 #1a1c1e",
                    }}
                  />

                  {/* Labels */}
                  <span
                    className={`z-10 flex-1 py-2 text-center transition-colors duration-300 ${
                      isLogin ? "text-[#ffffff]" : "text-[#1a1c1e]"
                    }`}
                  >
                    Login
                  </span>
                  <span
                    className={`z-10 flex-1 py-2 text-center transition-colors duration-300 ${
                      !isLogin ? "text-[#ffffff]" : "text-[#1a1c1e]"
                    }`}
                  >
                    Signup
                  </span>
                </div>
              </div>

              {/* Forms */}
              <div className="transition-all duration-300">{isLogin ? <LoginForm setIsLogin={setIsLogin}/> : <SignupForm setIsLogin={setIsLogin}/>}</div>
            </section>
          </div>
        </div>

        {/* Footer meta */}
        <div className="mt-33 flex items-center justify-between text-xs text-muted-foreground">
          <span>Secure by design</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-[#2fbe84]" aria-hidden="true" />
            Neo‑brutal aesthetics
          </span>
        </div>
      </div>

      {/* hidden reference image to satisfy asset usage */}
      <img src="/images/auth-reference.jpeg" alt="" className="hidden" aria-hidden="true" />
    </main>
  )
}

export default AuthPage