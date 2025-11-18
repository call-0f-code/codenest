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
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-8">
          <div className="inline-block bg-[#2C1810] dark:bg-[#F5E6D3] text-[#F5E6D3] dark:text-[#2C1810] px-6 py-3 border-4 border-black dark:border-[#2C1810] font-black -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              WHERE CODE MEETS CREATIVITY
            </span>
          </div>

          <h2 className="text-7xl lg:text-8xl font-black leading-none text-[#2C1810] dark:text-[#F5E6D3]">
            CODE.
            <br />
            <span className="text-[#C1502E]">CREATE.</span>
            <br />
            <span className="inline-block bg-[#2C1810] dark:bg-[#C1502E] text-[#F5E6D3] px-4 border-4 border-black rotate-2 shadow-[8px_8px_0px_0px_rgba(193,80,46,1)]">
              CONQUER.
            </span>
          </h2>

          <p className="text-2xl font-bold text-[#2C1810] dark:text-[#F5E6D3] leading-relaxed max-w-lg">
            Join a vibrant community of creative coders who turn ideas into reality.
          </p>

          <div className="flex flex-wrap gap-6">
            <button onClick={ () => ( navigate('/dsa'))}
            className="group px-10 py-5 bg-[#C1502E] text-[#F5E6D3] text-xl font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3">
              <Rocket className="h-6 w-6" />
              START CODING
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </button>
           
          </div>
        </div>

        {/* Right Side - Code Terminal */}
        <div className="relative">
          <div className="bg-[#2C1810] border-4 border-black shadow-[12px_12px_0px_0px_rgba(193,80,46,1)] p-8 rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-4 bg-[#C1502E] border-2 border-black"></div>
              <div className="w-4 h-4 bg-[#F5E6D3] border-2 border-black"></div>
              <div className="w-4 h-4 bg-[#C1502E] border-2 border-black"></div>
            </div>
            <div className="font-mono text-lg space-y-3 text-[#F5E6D3]">
              <div className="text-[#F5E6D3]/60">// Welcome to Call of Code</div>
              <div className="text-[#C1502E] font-bold">
                class <span className="text-[#F5E6D3]">CodingClub</span> {'{'}
              </div>
              <div className="ml-6">mission = <span className="text-[#C1502E]">"Inspire & Create"</span>;</div>
              <div className="ml-6">members = <span className="text-[#C1502E] font-bold">∞</span>;</div>
              <div className="ml-6">passion = <span className="text-[#C1502E] font-bold">MAX</span>;</div>
              <div className="ml-6 bg-[#C1502E] text-[#F5E6D3] px-3 py-1 inline-block border-2 border-[#F5E6D3] font-bold">
                {codeSnippets[currentSnippet]}
              </div>
              <div className="text-[#C1502E] font-bold">{'}'}</div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#C1502E] border-4 border-black -rotate-12"></div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#F5E6D3] border-4 border-black rotate-45"></div>
        </div>
      </div>
    </section>
  );
}
