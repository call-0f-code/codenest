import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-500
      bg-[#f5e6d3] text-[#1a1a1a] dark:bg-[#0f0e0e] dark:text-[#f5e6d3]">
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none transition-colors duration-500">
        <div className="absolute top-16 left-12 w-32 h-32 border-4 rotate-6 
          border-[#1a1a1a] bg-[#1a1a1a]/5 dark:border-[#f5e6d3] dark:bg-[#f5e6d3]/5"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-4 -rotate-3 
          border-[#d14334] bg-[#d14334]/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-24 w-[85vw] h-[2px] 
          bg-[#d14334]/20"></div>
      </div>

      {/* 404 */}
      <div className="relative z-10 group">
        <h1 className="text-[10rem] sm:text-[14rem] font-black tracking-tight leading-none 
          text-[#d14334] drop-shadow-[6px_6px_0px_#1a1a1a] 
          dark:drop-shadow-[6px_6px_0px_#f5e6d3] 
          group-hover:rotate-1 transition-transform duration-300">
          404
        </h1>
      </div>

      {/* Message */}
      <div className="text-center relative z-10 mt-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-2">
          Page Lost in the Void
        </h2>
        <p className="max-w-lg mx-auto text-base sm:text-lg leading-relaxed font-mono text-[#1a1a1a]/70 dark:text-[#f5e6d3]/70">
          The route <span className="text-[#d14334] font-semibold">{location.pathname}</span> 
          doesn’t exist. Maybe it drifted into the wrong dimension.
        </p>
      </div>

      {/* Route info */}
      <div className="mt-8 mb-12 p-4 border-2 rounded-xl font-mono text-sm tracking-wide 
        border-[#1a1a1a] bg-[#d14334]/10 dark:border-[#f5e6d3] backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#d14334]" />
          <span>{location.pathname}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <Link to="/">
          <Button
            size="lg"
            className="border-2 border-[#1a1a1a] dark:border-[#f5e6d3] 
              bg-[#d14334] text-[#f5e6d3] dark:bg-[#d14334] dark:text-[#f5e6d3]
              px-8 py-4 font-bold rounded-none hover:bg-[#f5e6d3] hover:text-[#0f0e0e] 
              dark:hover:bg-[#f5e6d3] dark:hover:text-[#0f0e0e]
              hover:rotate-1 hover:scale-105 transition-transform duration-300"
          >
            <Home className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
        </Link>

        <Button
          size="lg"
          className="border-2 border-[#1a1a1a] dark:border-[#f5e6d3] 
            bg-[#d14334] text-[#f5e6d3] dark:bg-[#d14334] 
            px-8 py-4 font-bold rounded-none hover:bg-[#f5e6d3] hover:text-[#0f0e0e] 
            dark:hover:bg-[#f5e6d3] dark:hover:text-[#0f0e0e]
            hover:rotate-1 transition-transform duration-300"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Go Back
        </Button>
      </div>

      {/* Floating code hints */}
      <div className="absolute bottom-10 left-10 text-xs font-mono text-[#1a1a1a]/40 dark:text-[#f5e6d3]/40 select-none">
        {"// Nothing found here, just echoes..."}
      </div>
      <div className="absolute top-10 right-10 text-xs font-mono text-[#d14334]/40 select-none">
        {"/* Brutalist 404 Poster */"}
      </div>
    </div>
  );
};

export default NotFound;
