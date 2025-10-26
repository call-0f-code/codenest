import { Code2, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ Correct destructuring

  return (
    <nav className="border-b-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#C1502E] p-2 border-4 border-black dark:border-[#F5E6D3] rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]">
            <Code2 className="h-8 w-8 text-[#F5E6D3]" />
          </div>
          <h1 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3] tracking-tight">
            CALL OF CODE
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2 font-bold text-[#2C1810] dark:text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-transform">
            ABOUT
          </button>
          <button className="px-6 py-2 font-bold text-[#2C1810] dark:text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-transform">
            EVENTS
          </button>

          {/* ✅ Theme toggle fixed */}
          <button
            onClick={toggleTheme}
            className="p-3 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black dark:border-[#2C1810] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] transition-all"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-[#2C1810]" />
            ) : (
              <Moon className="h-5 w-5 text-[#F5E6D3]" />
            )}
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-[#C1502E] text-[#F5E6D3] font-black border-4 border-black dark:border-[#F5E6D3] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] transition-all"
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
