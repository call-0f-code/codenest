import { Search } from "lucide-react";

export const SearchBar = ({ searchTerm, onSearchChange, placeholder}) => (
  <div className="relative mb-8">
    {/* Shadow/Offset Layer */}
    <div
      aria-hidden="true"
      className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2a2d35] dark:bg-[#0f1419] transition-transform"
    />
    
    {/* Main Search Container */}
    <div className="relative flex items-center border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] px-4 py-3 focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 transition-transform">
      <Search className="w-5 h-5 text-[#1a1f2e] dark:text-white mr-3" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-transparent text-[#1a1f2e] dark:text-white placeholder-[#5a6270] dark:placeholder-[#8b96a5] font-orbitron text-base font-bold focus:outline-none"
      />
    </div>
  </div>
);
