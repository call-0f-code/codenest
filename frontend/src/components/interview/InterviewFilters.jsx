import { Filter } from "lucide-react";
import { FILTER_OPTIONS } from "@/constants/interviewConstants";

export default function InterviewFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 bg-[#2C1810] dark:bg-[#F5E6D3] px-4 py-2 border-4 border-black dark:border-[#2C1810] shadow-[4px_4px_0px_0px_rgba(193,80,46,1)]">
        <Filter className="h-5 w-5 text-[#F5E6D3] dark:text-[#2C1810]" />
        <span className="font-black text-[#F5E6D3] dark:text-[#2C1810]">FILTER:</span>
      </div>
      
      {FILTER_OPTIONS.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => onFilterChange(filterOption)}
          className={`px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] transition-all duration-150 ${
            activeFilter === filterOption
              ? "bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] -rotate-1"
              : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(245,230,211,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5"
          }`}
        >
          {filterOption.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

