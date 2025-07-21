import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ChatbotIcon({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (hovered) {
      controls.start({
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        y: [0, -5, 0],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      });
    }
  }, [hovered, controls]);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={controls}
      className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full p-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 shadow-md hover:scale-105 transition-all duration-300"
    >
      <img
        src="/Chatbot-icon.png"
        alt="Chatbot"
        width={72}
        height={72}
        className="rounded-full"
      />
    </motion.div>
  );
}
