import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { VERDICT_CONFIG } from "@/constants/interviewConstants";

export default function InterviewExperienceItem({ interview }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const config = VERDICT_CONFIG[interview.verdict];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Trophy":
        return Trophy;
      case "XCircle":
        return XCircle;
      case "Clock":
        return Clock;
      default:
        return Clock;
    }
  };

  const Icon = getIcon(config.icon);

  return (
    <div className="relative">
      {/* This is the main "clickable" card. 
        It's one single accessible button.
      */}
      <motion.div
        className="relative z-10 bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] overflow-visible cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          x: -4,
          y: -4,
          boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
        }}
        style={{
          boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
        }}
        // Accessibility props for the clickable card
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {/* "File Tab" for Company */}
        <motion.div
          className="absolute -top-4 left-6 z-20 bg-[#C1502E] text-[#F5E6D3] px-4 py-2 border-4 border-black dark:border-[#F5E6D3] font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          whileHover={{ rotate: -3, scale: 1.05 }}
        >
          <h4 className="text-xl">{interview.company}</h4>
        </motion.div>

        {/* "Stamp" for Verdict */}
        <motion.div
          className={`${config.bg} absolute -top-3 -right-3 z-20 p-2 border-4 border-black dark:border-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          initial={{ rotate: 5 }}
          whileHover={{ rotate: -5, scale: 1.1 }}
        >
          <div className="flex items-center gap-2 text-white font-black text-sm">
            <Icon className="h-5 w-5" />
            {config.label}
          </div>
        </motion.div>

        {/* "Stamp" for Anonymous */}
        {interview.isAnonymous && (
          <motion.span
            className="absolute -bottom-3 left-4 z-20 text-xs font-black bg-black text-[#F5E6D3] px-3 py-1.5 border-2 border-[#C1502E]"
            initial={{ rotate: -3 }}
            whileHover={{ rotate: 3, scale: 1.1 }}
          >
            👤 ANONYMOUS
          </motion.span>
        )}

        {/* Card Body Content */}
        <div className="p-6 pt-16 pr-16 min-h-[100px] flex flex-col justify-center">
          <p className="text-2xl font-black text-[#C1502E] dark:text-[#C1502E]">
            {interview.role}
          </p>
        </div>

        {/* Expand/Collapse Icon (purely decorative) */}
        <div className="absolute bottom-4 right-4 text-black dark:text-[#F5E6D3]">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded Content Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="relative z-0 bg-white dark:bg-[#1a0f0a] border-4 border-black dark:border-[#F5E6D3] border-t-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              marginTop: -4, // Overlaps the bottom border of the card above
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Zigzag pattern decoration */}
            <div
              className="absolute top-0 left-0 right-0 h-2 bg-[#C1502E]"
              style={{
                clipPath:
                  "polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)",
              }}
            />

            <div className="p-6 pt-8 relative">
              {/* Content background with cut corner */}
              <div
                className="relative bg-white dark:bg-[#1a0f0a] border-4 border-black dark:border-[#F5E6D3] p-6"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
                }}
              >
                {/* Corner fold effect */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[34px] border-t-[#C1502E] border-l-[34px] border-l-transparent" />

                {/* This is your complete, fixed ReactMarkdown section.
                  No changes were needed here.
                */}
                <motion.div
                  className="prose prose-sm dark:prose-invert max-w-none text-[#2C1810] dark:text-[#F5E6D3] font-medium"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, className, children, ...rest }) => (
                        <p
                          className={[
                            "mb-3 text-[#2C1810] dark:text-[#F5E6D3]",
                            className,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          {children}
                        </p>
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-black text-[#C1502E]"
                          {...props}
                        />
                      ),
                      em: ({ node, ...props }) => (
                        <em
                          className="italic bg-[#F5E6D3] dark:bg-[#2C1810] px-1"
                          {...props}
                        />
                      ),
                      ul: ({ node, className, children, ...rest }) => (
                        <ul
                          className={["list-none ml-0 mb-3", className]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          {children}
                        </ul>
                      ),
                      ol: ({ node, className, children, ...rest }) => (
                        <ol
                          className={["list-none ml-0 mb-3", className]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          {children}
                        </ol>
                      ),
                      li: ({ node, className, children, ...rest }) => (
                        <li
                          className={[
                            "mb-2 pl-6 relative text-[#2C1810] dark:text-[#F5E6D3]",
                            className,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          <span className="absolute left-0 top-1 w-3 h-3 bg-[#C1502E] border-2 border-black dark:border-[#F5E6D3]" />
                          {children}
                        </li>
                      ),
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-2xl font-black mb-3 bg-[#C1502E] text-[#F5E6D3] px-3 py-1 border-4 border-black dark:border-[#F5E6D3] inline-block -rotate-1"
                          {...props}
                        />
                      ),
                      h2: ({ node, className, children, ...rest }) => (
                        <h2
                          className={[
                            "text-xl font-black mb-3 border-l-4 border-[#C1502E] pl-3 text-[#2C1810] dark:text-[#F5E6D3]",
                            className,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          {children}
                        </h2>
                      ),
                      h3: ({ node, className, children, ...rest }) => (
                        <h3
                          className={[
                            "text-lg font-bold mb-2 text-[#2C1810] dark:text-[#F5E6D3]",
                            className,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          {children}
                        </h3>
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-[#C1502E] font-bold underline decoration-4 decoration-[#C1502E] hover:bg-[#C1502E] hover:text-[#F5E6D3] px-1 transition-colors"
                          {...props}
                        />
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] px-2 py-1 font-mono text-sm border-2 border-[#C1502E]"
                          {...props}
                        />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr
                          className="my-6 border-0 h-1 bg-black dark:bg-[#F5E6D3]"
                          style={{
                            clipPath:
                              "polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0, 100% 100%, 0 100%)",
                          }}
                          {...props}
                        />
                      ),
                      blockquote: ({ node, className, children, ...rest }) => (
                        <blockquote
                          className={[
                            "border-l-8 border-[#C1502E] bg-[#F5E6D3] dark:bg-[#2C1810] pl-4 py-2 my-4 italic font-bold relative text-[#2C1810] dark:text-[#F5E6D3]",
                            className,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          {...rest}
                        >
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {interview.content}
                  </ReactMarkdown>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}