import { Search } from "lucide-react";

export const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => (
  <div className="relative mb-12 w-full max-w-2xl mx-auto">
    {/* Offset Shadow Layer */}
    <div
      aria-hidden="true"
      className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2b1e1a] border-2 border-black transition-transform"
    />

    {/* Main Search Box */}
    <div
      className="relative flex items-center border-4 border-black 
      bg-[#FFFFFF] 
      px-6 py-5  
      hover:-translate-x-1 hover:-translate-y-1 
      shadow-[10px_10px_0_0_rgba(193,80,46,1)] 
      transition-all duration-200"
    >
      <Search className="w-8 h-8 text-black dark:text-[#C1502E] mr-4" />

      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-transparent text-2xl 
        text-[#1a1f2e] 
        placeholder-[#b05a3c] 
        font-extrabold focus:outline-none"
      />
    </div>

    {/* Decorative Label */}
    <div className="absolute -top-6 left-3 bg-[#b05a3c] text-white text-sm font-extrabold px-4 py-1 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      SEARCH
    </div>
  </div>
);
