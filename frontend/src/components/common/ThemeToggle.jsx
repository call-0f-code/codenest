import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // You can use Heroicons or any other icons

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-lg border-4 border-[#2C1810] bg-[#F5E6D3] dark:bg-[#2C1810] dark:border-[#F5E6D3] shadow-[4px_4px_0px_#2C1810] dark:shadow-[4px_4px_0px_#F5E6D3] transition-all duration-200 hover:translate-y-1 active:translate-y-0"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 text-[#2C1810] dark:text-[#F5E6D3]" />
      ) : (
        <Sun className="w-6 h-6 text-[#F5E6D3]" />
      )}
    </button>
  );
}
