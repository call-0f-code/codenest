import { useState } from "react";
import { Trophy, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { VERDICT_CONFIG } from "@/constants/interviewConstants";

export default function InterviewExperienceItem({ interview }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const config = VERDICT_CONFIG[interview.verdict];
  
  const getIcon = (iconName) => {
    switch(iconName) {
      case "Trophy": return Trophy;
      case "XCircle": return XCircle;
      case "Clock": return Clock;
      default: return Clock;
    }
  };
  
  const Icon = getIcon(config.icon);

  return (
    <div className="bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
      {/* Collapsed Header - Always Visible */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 cursor-pointer hover:bg-[#F5E6D3]/80 dark:hover:bg-[#2C1810]/80 transition-colors"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Company, Role, Anonymous Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-xl font-black text-[#2C1810] dark:text-[#F5E6D3] truncate">
                {interview.company}
              </h4>
              {interview.isAnonymous && (
                <span className="text-xs font-bold bg-[#2C1810] dark:bg-[#F5E6D3] text-[#F5E6D3] dark:text-[#2C1810] px-2 py-1 border-2 border-black">
                  👤 ANON
                </span>
              )}
            </div>
            <p className="text-base font-bold text-[#C1502E] truncate">
              {interview.role}
            </p>
          </div>

          {/* Middle: Verdict Badge */}
          <div className={`${config.bg} px-4 py-2 border-4 border-black -rotate-2 flex-shrink-0`}>
            <div className="flex items-center gap-2 text-white font-black text-sm">
              <Icon className="h-4 w-4" />
              {config.label}
            </div>
          </div>

          {/* Right: Expand/Collapse Button */}
          <button
            className="flex-shrink-0 bg-[#C1502E] p-2 border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-[#F5E6D3]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#F5E6D3]" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t-4 border-black">
          <div 
            className="prose prose-sm max-w-none text-[#2C1810] dark:text-[#F5E6D3] font-medium mt-6"
            dangerouslySetInnerHTML={{ __html: interview.content }}
          />
        </div>
      )}
    </div>
  );
}