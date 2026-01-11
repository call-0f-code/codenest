"use client";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const DARK_BROWN = "#2C1810";
const BURNT_ORANGE = "#C1502E";
const OFF_WHITE_LIGHT = "#FFF6EE"; 
const SAFFRON = "#FF9933";

const CodingCortexIcon = ({ isHovered }) => {
  const javaCode = ["public class Cortex {", "  void help() {", "    System.out.println();", "  }", "}"];
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="70" height="60" rx="4" stroke={DARK_BROWN} strokeWidth="6" fill="#1A0D08"/>
        <rect x="15" y="20" width="70" height="15" rx="2" fill={DARK_BROWN}/>
        <circle cx="25" cy="27.5" r="3" fill="#FF5F56"/> 
        <circle cx="35" cy="27.5" r="3" fill="#FFBD2E"/> 
        <circle cx="45" cy="27.5" r="3" fill="#27C93F"/> 
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.g key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <path d="M35 45L25 55L35 65" stroke={SAFFRON} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M65 45L75 55L65 65" stroke={SAFFRON} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <motion.rect x="45" y="52" width="10" height="6" fill={BURNT_ORANGE} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            </motion.g>
          ) : (
            <motion.g key="hover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <foreignObject x="22" y="38" width="56" height="38">
                <div className="flex flex-col overflow-hidden h-full">
                  <motion.div animate={{ y: [0, -50] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="text-[5px] font-mono text-[#27C93F] leading-[7px] whitespace-pre italic">
                    {javaCode.join("\n") + "\n" + javaCode.join("\n")}
                  </motion.div>
                </div>
              </foreignObject>
            </motion.g>
          )}
        </AnimatePresence>
        <line x1="15" y1="88" x2="35" y2="88" stroke={DARK_BROWN} strokeWidth="4" strokeLinecap="round"/>
        <line x1="65" y1="88" x2="85" y2="88" stroke={DARK_BROWN} strokeWidth="4" strokeLinecap="round"/>
        <circle cx="50" cy="88" r="6" fill={BURNT_ORANGE} stroke={DARK_BROWN} strokeWidth="3"/>
    </svg>
  );
};

export default function ChatbotIcon({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!hovered) {
      controls.start({ y: [0, -8, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } });
    } else {
      controls.start({ scale: 1.1, transition: { duration: 0.2 } });
    }
  }, [hovered, controls]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 10 }}
            /* BOX DYNAMICS: 
               - w-fit: Box sirf text jitna bada hoga.
               - dark:bg-white: Black theme mein white bg ho jayega.
               - bg-black: White theme mein black bg ho jayega.
            */
            className="mb-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 text-[10px] font-mono border-l-4 border-[#C1502E] shadow-[4px_4px_0_0_#2C1810] w-fit"
          >
            <div className="flex flex-col">
              <span className="opacity-40 text-[7px] uppercase tracking-tighter">System:</span>
              <span className="font-bold whitespace-nowrap">system.ask()</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={controls}
        className="relative p-1 border-4 transition-all duration-300 cursor-pointer"
        style={{ 
          borderColor: DARK_BROWN, 
          backgroundColor: hovered ? "#FFFFFF" : OFF_WHITE_LIGHT,
          borderRadius: "12px",
          /* SHADOW: Glow add kiya hai for dark mode popping */
          boxShadow: hovered 
            ? `8px 8px 0px ${BURNT_ORANGE}, 0px 0px 15px rgba(193, 80, 46, 0.4)` 
            : `6px 6px 0px ${DARK_BROWN}`,
        }}
      >
        <div className="w-16 h-16 flex items-center justify-center">
             <CodingCortexIcon isHovered={hovered} />
        </div>
      </motion.button>
    </div>
  );
}