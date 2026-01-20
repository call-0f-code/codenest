import { useState, useEffect } from "react";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const codeSnippets = [
    "{ creative: true }",
    "const magic = () => code",
    "function inspire() {}",
    "class Innovate extends Code",
    "while(learning) { grow(); }",
  ];

  const [currentSnippet, setCurrentSnippet] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-block bg-[#2C1810] dark:bg-[#F5E6D3] text-[#F5E6D3] dark:text-[#2C1810] px-4 py-2 sm:px-6 sm:py-3 border-4 border-black dark:border-[#2C1810] font-black -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              WHERE CODE MEETS CREATIVITY
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none text-[#2C1810] dark:text-[#F5E6D3]">
            CODE.
            <br />
            <span className="text-[#C1502E]">CREATE.</span>
            <br />
            <span className="inline-block bg-[#2C1810] dark:bg-[#C1502E] text-[#F5E6D3] px-3 sm:px-4 border-4 border-black rotate-2 shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] sm:shadow-[8px_8px_0px_0px_rgba(193,80,46,1)]">
              CONQUER.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2C1810] dark:text-[#F5E6D3] leading-relaxed max-w-lg">
            Join a vibrant community of creative coders who turn ideas into reality.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <button onClick={() => (navigate('/dsa'))}
              className="group px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-[#C1502E] text-[#F5E6D3] text-base sm:text-lg md:text-xl font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 flex items-center gap-2 sm:gap-3 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
              START CODING
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
            </button>

          </div>
        </div>

        {/* Right Side - Code Terminal */}
        <div className="relative">
          <div
            className="
      bg-[#2C1810] dark:bg-[#F5E6D3]
      border-4 border-black 
      shadow-[8px_8px_0px_0px_rgba(193,80,46,1)] sm:shadow-[10px_10px_0px_0px_rgba(193,80,46,1)] md:shadow-[12px_12px_0px_0px_rgba(193,80,46,1)]
      p-4 sm:p-6 md:p-8 rotate-1 sm:rotate-2 hover:rotate-0
      transition-transform duration-300
    "
          >
            {/* Window Buttons */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#C1502E] border-2 border-black dark:border-[#F5E6D3]"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#F5E6D3] border-2 border-black dark:border-[#F5E6D3]"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#C1502E] border-2 border-black dark:border-[#F5E6D3]"></div>
            </div>

            {/* Text */}
            <div
              className="
        font-mono text-sm sm:text-base md:text-lg space-y-2 sm:space-y-3
        text-[#F5E6D3] dark:text-[#2C1810]
      "
            >
              {/* Comment */}
              <div className="text-[#F5E6D3]/60 dark:text-[#2C1810]/60">
        // Welcome to Call of Code
              </div>

              {/* Class line */}
              <div className="font-bold text-[#C1502E]">
                class <span className="text-[#F5E6D3] dark:text-[#2C1810]">CodingClub</span> {'{'}
              </div>

              <div className="ml-4 sm:ml-6">
                mission =
                <span className="text-[#C1502E]"> "Inspire & Create"</span>;
              </div>

              <div className="ml-4 sm:ml-6">
                members = <span className="text-[#C1502E] font-bold">∞</span>;
              </div>

              <div className="ml-4 sm:ml-6">
                passion = <span className="text-[#C1502E] font-bold">MAX</span>;
              </div>

              {/* Dynamic snippet box */}
              <div
                className="
          ml-4 sm:ml-6 px-2 py-1 sm:px-3 sm:py-1 inline-block font-bold text-xs sm:text-sm md:text-base
          bg-[#C1502E] text-[#F5E6D3]
          dark:bg-[#C1502E] dark:text-[#2C1810]
          border-2 border-[#F5E6D3] dark:border-[#2C1810]
        "
              >
                {codeSnippets[currentSnippet]}
              </div>

              <div className="font-bold text-[#C1502E]">{'}'}</div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#C1502E] border-4 border-black -rotate-12"></div>
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#F5E6D3] border-4 border-black rotate-45"></div>
        </div>
      </div>
    </section>
  );
}
