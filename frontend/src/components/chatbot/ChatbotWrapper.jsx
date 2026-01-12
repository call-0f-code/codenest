"use client";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./ChatbotIcon";
import { useLocation } from "react-router-dom";


const COLORS = {
  border: "var(--color-chatbot-border, #000000)",
  window: "var(--color-chatbot-bg-window, #F5E6D3)",
  messages: "var(--color-chatbot-bg-messages, #EAD8C3)",
  text: "var(--color-chatbot-text, #2C1810)",

  burntOrange: "#C1502E",
  saffron: "#FF9933",
};

// --- NEW NEOMORPHIC TERMINAL ICON ---
const TerminalIcon = ({ size = "md" }) => {
  const isSm = size === "sm";
  return (
    <div
      className={`${isSm ? 'w-8 h-8' : 'w-10 h-10'} relative flex items-center justify-center rounded-lg flex-shrink-0 group`}
      style={{
        background: `linear-gradient(145deg, #2a2a2a, #000000)`,
        boxShadow: `4px 4px 8px rgba(0,0,0,0.3), -1px -1px 4px rgba(255,255,255,0.1)`,
        border: `1.5px solid ${COLORS.border}`
      }}
    >
      <div className=" text-[10px] font-bold text-white flex items-center gap-0.5">
        <span className="text-[#FF9933]">{">"}</span>
        <span className="animate-pulse">_</span>
      </div>
      {/* Decorative Brackets */}
      <div className="absolute -top-1 -right-1 text-[8px] text-[#FF9933] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        {"{}"}
      </div>
    </div>
  );
};

export default function ChatbotWrapper({ currentQuestionContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();

  const messagesEndRef = useRef(null);
  const lastQuestionContext = useRef(null);
  const abortTypingRef = useRef(false);


  useEffect(() => {
    if (currentQuestionContext) {
      lastQuestionContext.current = currentQuestionContext;
    }
  }, [currentQuestionContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isTyping) {
      scrollToBottom();
    }
  }, [messages]);



  const toggleChat = () => {
    setIsOpen((prev) => {
      const newState = !prev;

      if (newState && messages.length === 0) {
        const welcome = "SYSTEM_READY: Cortex online. How can I help you debug your experience today?";
        let currentText = "";
        let index = 0;

        setTimeout(() => {
          const typeWelcome = () => {
            if (index < welcome.length) {
              currentText += welcome.charAt(index);
              setMessages([{ from: "bot", text: currentText }]);
              index++;
              setTimeout(typeWelcome, 25);
            } else {
              setMessages([{ from: "bot", text: welcome }]);
            }
          };

          typeWelcome();
        }, 500);
      }

      return newState;
    });
  };


  const toggleFullScreen = () => setIsFull((prev) => !prev);


  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userQuery = input;
    const currentPath = location.pathname; // This is the "Context Awareness" part!


    const updatedMessages = [...messages, { from: "user", text: userQuery }];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // 3. Call your BACKEND instead of calling Gemini directly from frontend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: currentPath,          // "/dsa"
          userAnswer: userQuery,
          questionContext: lastQuestionContext.current,
          history: messages,

        }),
      });

      const data = await response.json();

      setMessages([...updatedMessages, { from: "bot", text: data.reply }]);
      setIsTyping(false);

    } catch (error) {
      setMessages([...updatedMessages, { from: "bot", text: "ERR_REFUSED: Check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };


  const stopStreaming = () => {
    abortTypingRef.current = true;
    setIsTyping(false);
  };


  return (
    <>
  
      <ChatbotIcon onClick={toggleChat} />

     
      <AnimatePresence>
        {isOpen && (
          // Wrapper to hold the floating effect
          <div className={`fixed right-8 bottom-8 z-50 transition-all duration-500 ${isFull ? 'inset-0 right-0 bottom-0' : 'w-[420px] h-[580px]'}`}>

            {/* Neomorphic Deep Shadow Layer */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 transition-all duration-300"
              style={{
                backgroundColor: COLORS.border,
                borderRadius: isFull ? '0' : '1.5rem',
                boxShadow: `inset 6px 6px 12px rgba(0,0,0,0.2)`
              }}
            />

            {/* Main Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex flex-col overflow-hidden w-full h-full transition-all duration-300"
              style={{
                backgroundColor: COLORS.window,
                border: `4px solid ${COLORS.border}`,
                boxShadow: `12px 12px 0 0 ${COLORS.border}`,
                borderRadius: isFull ? '0' : '1.2rem'
              }}
            >

              {/* Header */}
              <div
                className="flex items-center justify-between p-4 border-b-4"
                style={{ backgroundColor: COLORS.burntOrange, borderColor: COLORS.border }}
              >
                <div className="flex items-center space-x-3">
                  <TerminalIcon size="md" />
                  <div>
                    <h2 className="font-black text-xl text-white tracking-tighter uppercase">Cortex.exe</h2>
                    <p className="text-[10px]  font-bold text-white/70 animate-pulse tracking-widest">{">"} STATUS: ACTIVE</p>
                  </div>
                </div>

                {/* Header Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={toggleFullScreen}
                    className="bg-transparent border-2 border-black p-1 shadow-[2px_2px_0_0_black] hover:bg-green-500 hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
                    title={isFull ? "Minimize" : "Maximize"}
                  >
                    {isFull ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth={3} d="M4 8h16M4 16h16" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth={3} d="M4 4h16v16H4z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent border-2 border-black p-1 shadow-[2px_2px_0_0_black] hover:bg-red-500 hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
                    title="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: COLORS.messages, scrollbarWidth: "none" }}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === "user" ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] flex items-start gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {msg.from !== "user" && <TerminalIcon size="sm" />}

                      <div
                        className="p-4 border-4  text-xs font-bold transition-all duration-300"
                        style={{
                          borderColor: COLORS.border,
                          backgroundColor: msg.from === "user" ? COLORS.burntOrange : COLORS.window,
                          color: msg.from === "user" ? 'white' : COLORS.text,
                          borderRadius: msg.from === "user" ? "15px 15px 2px 15px" : "15px 15px 15px 2px",
                          boxShadow: msg.from === "user"
                            ? `4px 4px 0 0 ${COLORS.border}`
                            : `inset 4px 4px 8px rgba(0,0,0,0.05), 4px 4px 0 0 ${COLORS.border}`,
                        }}
                      >
                        <ReactMarkdown
                          components={{
                            code: ({ children }) => <code className="bg-black text-[#FF9933] px-1 rounded">{children}</code>,
                            pre: ({ children }) => <pre className="bg-black text-white p-3 border-2 border-[#FF9933] rounded my-2 overflow-x-auto">{children}</pre>
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <TerminalIcon size="sm" />
                    <div
                      className="flex gap-1.5 px-4 py-3 border-4 border-black bg-black shadow-[4px_4px_0_0_black]"
                      style={{ borderRadius: "15px 15px 15px 2px" }}
                    >

                      <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s] bg-[#FF9933] dark:bg-white" />
                      <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s] bg-[#FF9933] dark:bg-white" />
                      <div className="w-2 h-2 rounded-full animate-bounce bg-[#FF9933] dark:bg-white" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t-4" style={{ backgroundColor: COLORS.messages, borderColor: COLORS.border }}>
                <div className="relative flex items-center gap-2 ">
                  <span className="text-black font-black">{">"}</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="ENTER QUERY..."

                    className="flex-1 bg-white border-4 border-black p-3 text-xs font-bold uppercase text-black placeholder:text-black/40 focus:outline-none"
                    style={{ boxShadow: `4px 4px 0 0 ${COLORS.border}` }}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-3 border-4 border-black font-black text-white hover:brightness-110 active:shadow-none active:translate-x-1 active:translate-y-1"
                    style={{ backgroundColor: COLORS.burntOrange, boxShadow: `4px 4px 0 0 ${COLORS.border}` }}
                  >
                    RUN
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}