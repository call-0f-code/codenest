import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
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
    <motion.div 
      className="bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3]"
      whileHover={{ 
        x: -4, 
        y: -4,
        boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)"
      }}
      style={{
        boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)"
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Collapsed Header - Always Visible */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 cursor-pointer hover:bg-[#F5E6D3]/80 dark:hover:bg-[#2C1810]/80 transition-colors"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Company, Role, Anonymous Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <motion.h4 
                className="text-xl font-black text-[#2C1810] dark:text-[#F5E6D3]"
                whileHover={{ color: "#C1502E" }}
              >
                {interview.company}
              </motion.h4>
              {interview.isAnonymous && (
                <motion.span 
                  className="text-xs font-bold bg-[#2C1810] dark:bg-[#F5E6D3] text-[#F5E6D3] dark:text-[#2C1810] px-2 py-1 border-2 border-black dark:border-[#2C1810]"
                  style={{
                    boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)"
                  }}
                  whileHover={{ rotate: -2 }}
                  initial={{ rotate: -2 }}
                >
                  👤 ANON
                </motion.span>
              )}
            </div>
            <p className="text-base font-bold text-[#C1502E]">
              {interview.role}
            </p>
          </div>

          {/* Middle: Verdict Badge */}
          <motion.div 
            className={`${config.bg} px-4 py-2 border-4 border-black dark:border-[#F5E6D3] flex-shrink-0`}
            style={{
              boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)"
            }}
            whileHover={{ 
              rotate: -3,
              boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)"
            }}
            initial={{ rotate: -2 }}
          >
            <div className="flex items-center gap-2 text-white font-black text-sm">
              <Icon className="h-4 w-4" />
              {config.label}
            </div>
          </motion.div>

          {/* Right: Expand/Collapse Button */}
          <motion.button
            className="flex-shrink-0 bg-[#C1502E] p-2 border-4 border-black dark:border-[#F5E6D3]"
            style={{
              boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)"
            }}
            whileHover={{ 
              x: -2, 
              y: -2,
              boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)"
            }}
            whileTap={{ 
              x: 2, 
              y: 2,
              boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)"
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-[#F5E6D3]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#F5E6D3]" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Expanded Content - Markdown */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="px-6 pb-6 pt-0 border-t-4 border-black dark:border-[#F5E6D3]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="prose prose-sm max-w-none text-[#2C1810] dark:text-[#F5E6D3] font-medium mt-6"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ReactMarkdown
                components={{
                  // Style markdown elements to match your theme
                  p: ({node, ...props}) => <p className="mb-2" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                  em: ({node, ...props}) => <em className="italic" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside ml-4 mb-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside ml-4 mb-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                  a: ({node, ...props}) => <a className="text-[#C1502E] underline hover:text-[#C1502E]/80" {...props} />,
                  code: ({node, ...props}) => <code className=" px-1 py-0.5 font-mono text-sm" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-4 border-t-4 border-black" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#C1502E] pl-4 italic my-2" {...props} />,
                }}
              >
                {interview.content}
              </ReactMarkdown>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}