import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
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
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative corner pieces */}
      <motion.div
        className="absolute -top-3 -left-3 w-8 h-8 bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] z-10"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] z-10"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main container with clip-path for unique shape */}
      <motion.div
        className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] overflow-hidden"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        }}
        whileHover={{
          x: -4,
          y: -4,
          boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
        }}
        initial={{
          boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Header with asymmetric layout */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-6 cursor-pointer relative"
        >
          {/* Background accent stripe */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#C1502E]" />

          <div className="flex items-start gap-4">
            {/* Left side - Company info with stacked layout */}
            <div className="flex-1 min-w-0 pl-4">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -inset-1 bg-[#C1502E] border-2 border-black dark:border-[#F5E6D3] -rotate-2" />
                  <h4 className="relative text-2xl font-black text-[#2C1810] dark:text-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] px-3 py-1 border-2 border-black dark:border-[#F5E6D3]">
                    {interview.company}
                  </h4>
                </motion.div>

                {interview.isAnonymous && (
                  <motion.span
                    className="text-xs font-black bg-black text-[#F5E6D3] px-3 py-1.5 border-2 border-[#C1502E] relative"
                    whileHover={{ rotate: 3 }}
                    initial={{ rotate: -3 }}
                  >
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C1502E]" />
                    👤 ANON
                  </motion.span>
                )}
              </div>

              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-black opacity-10" />
                <p className="relative text-lg font-bold text-[#C1502E] px-2">
                  {interview.role}
                </p>
              </div>
            </div>

            {/* Right side - Verdict and expand button stacked vertically */}
            <div className="flex flex-col gap-3 items-end">
              {/* Verdict badge with unique shape */}
              <motion.div
                className={`${config.bg} px-4 py-3 border-4 border-black dark:border-[#F5E6D3] relative`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 80%, 90% 100%, 0 100%)",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                }}
                whileHover={{
                  rotate: -2,
                  scale: 1.05,
                  boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
                }}
                initial={{ rotate: 2 }}
              >
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  {config.label}
                </div>
                {/* Corner decoration */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-black dark:bg-[#F5E6D3] border-2 border-black dark:border-[#F5E6D3]" />
              </motion.div>

              {/* Expand button with unique shape */}
              <motion.button
                className="bg-[#C1502E] p-3 border-4 border-black dark:border-[#F5E6D3] relative group"
                style={{
                  clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)",
                  boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-[#F5E6D3]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#F5E6D3]" />
                  )}
                </motion.div>

                {/* Sparkle decoration on hover */}
                <motion.div
                  className="absolute -top-2 -left-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="h-4 w-4 text-[#C1502E]" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Expanded Content with creative layout */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="border-t-4 border-black dark:border-[#F5E6D3] relative"
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
      </motion.div>
    </motion.div>
  );
}