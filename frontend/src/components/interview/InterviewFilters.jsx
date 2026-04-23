import { Filter, Trophy, XCircle, Clock, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { FILTER_OPTIONS } from "@/constants/interviewConstants";

const FILTER_META = {
  All:      { icon: LayoutGrid, activeColor: "bg-[#2C1810]",  textColor: "text-[#F5E6D3]" },
  Selected: { icon: Trophy,     activeColor: "bg-green-600",   textColor: "text-white"      },
  Rejected: { icon: XCircle,    activeColor: "bg-red-600",     textColor: "text-white"      },
  Pending:  { icon: Clock,      activeColor: "bg-yellow-500",  textColor: "text-[#2C1810]"  },
};

export default function InterviewFilters({ activeFilter, onFilterChange }) {
  return (
    <>
      {/* ── MOBILE: full-width stamp tab strip (hidden on sm+) ── */}
      <div className="sm:hidden">
        {/* Section label — matches desktop FILTER: block style */}
        <div className="inline-flex items-center gap-2 bg-[#2C1810] dark:bg-[#F5E6D3] px-4 py-2 border-4 border-black dark:border-[#2C1810] shadow-[4px_4px_0px_0px_rgba(193,80,46,1)] mb-3">
          <Filter className="h-4 w-4 text-[#F5E6D3] dark:text-[#2C1810]" />
          <span className="font-black text-sm text-[#F5E6D3] dark:text-[#2C1810]">FILTER:</span>
        </div>

        {/* Tab strip */}
        <div className="flex border-4 border-black dark:border-[#F5E6D3]">
          {FILTER_OPTIONS.map((opt, i) => {
            const { icon: Icon } = FILTER_META[opt];
            const isActive = activeFilter === opt;
            const isLast   = i === FILTER_OPTIONS.length - 1;

            return (
              <motion.button
                key={opt}
                onClick={() => onFilterChange(opt)}
                whileTap={{ x: 2, y: 2 }}
                className={[
                  "flex-1 flex flex-col items-center justify-center gap-1 py-3 font-black text-[10px] tracking-wider transition-all duration-150 relative",
                  !isLast && "border-r-4 border-black dark:border-[#F5E6D3]",
                  isActive
                    ? "bg-[#C1502E] text-[#F5E6D3] -translate-x-0.5 -translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] z-10"
                    : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(245,230,211,1)]",
                ].join(" ")}
              >
                <Icon className={`h-4 w-4 ${isActive ? "" : "opacity-60"}`} />
                <span>{opt.toUpperCase()}</span>
              </motion.button>
            );
          })}
        </div>
      </div>


      {/* ── DESKTOP: original horizontal button row (hidden on mobile) ── */}
      <div className="hidden sm:flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[#2C1810] dark:bg-[#F5E6D3] px-4 py-2 border-4 border-black dark:border-[#2C1810] shadow-[4px_4px_0px_0px_rgba(193,80,46,1)]">
          <Filter className="h-5 w-5 text-[#F5E6D3] dark:text-[#2C1810]" />
          <span className="font-black text-[#F5E6D3] dark:text-[#2C1810]">FILTER:</span>
        </div>

        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onFilterChange(opt)}
            className={`px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] transition-all duration-150 ${
              activeFilter === opt
                ? "bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] -rotate-1"
                : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(245,230,211,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5"
            }`}
          >
            {opt.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}

