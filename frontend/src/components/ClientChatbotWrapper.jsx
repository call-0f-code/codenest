"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fetchGeminiResponse } from "../lib/fetchGeminiResponse";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";


export default function ClientChatbotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const toggleFullScreen = () => setIsFull((prev) => !prev);
  const abortTypingRef = useRef(false);


  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const sendMessage = async () => {
  if (!input.trim()) return;

  const updatedMessages = [...messages, { from: "user", text: input }];
  setMessages(updatedMessages);
  setInput("");
  setIsTyping(true);

  abortTypingRef.current = false; // ✅ Reset before streaming

  const fullReply = await fetchGeminiResponse(input, updatedMessages);

  let currentText = "";
  let index = 0;

  const streamReply = () => {
    if (abortTypingRef.current) { // ✅ check using ref
      setIsTyping(false);
      return;
    }

    if (index < fullReply.length) {
      currentText += fullReply.charAt(index);
      setMessages([...updatedMessages, { from: "bot", text: currentText }]);
      index++;
      setTimeout(streamReply, 10); // typing speed
    } else {
      setIsTyping(false);
    }
  };

  streamReply();
};


const stopStreaming = () => {
  abortTypingRef.current = true;
};


  return (
    <>
      {/* Chatbot Icon it is*/}
      <motion.button
        onClick={toggleChat}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 p-1 rounded-full bg-transparent"
      >
        <img
          src="/Chatbot-icon.png"
          alt="Chatbot Icon"
          width={72}
          height={72}
          className="rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${isFull ? "inset-0 rounded-none" : "right-6 bottom-6 w-[420px] h-[550px] rounded-3xl"} bg-black z-50 flex flex-col shadow-xl overflow-hidden transition-all duration-300`}

          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center">
                  <img src="/robot-assistant.png" alt="bot" className="w-8 h-8 rounded-full" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-3xl">Cortex</h2>

                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={toggleFullScreen}
                  className="text-gray-400 hover:text-white p-2"
                  title={isFull ? "Minimize" : "Maximize"}
                >
                  {isFull ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-2"
                  title="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" style={{ overflowX: "hidden", scrollbarWidth: "none" }}>
              {messages.map((msg, idx) => (
                <div key={idx} className="flex justify-center">
                  <div className="max-w-2xl w-full flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === "user"
                        ? "bg-black"
                        : "bg-black"
                        }`}
                    >
                      {msg.from === "user" ? (
                        <svg className="w-4 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <img
                          src="/Chatbot-icon.png"
                          alt="bot"
                          className="w-12 h-8 rounded-full"
                        />
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-white w-full">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2">{children}</p>,
                          code: ({ children }) => (
                            <code className="bg-gray-800 text-green-300 px-1 py-0.5 rounded">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-900 p-3 rounded overflow-auto mb-2">{children}</pre>
                          ),
                          li: ({ children }) => <li className="ml-6 list-disc">{children}</li>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>



            {/* Input Bar */}
            <div className="p-6 border-t border-black">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Send a message..."
                    className="w-full bg-gray-900 border border-black rounded-full px-6 py-4 text-white pr-20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  {/* CONDITIONAL BUTTON- when user typing it will show 'send' icon otherwise square when bot is typing */}
                  {isTyping ? (
                    <button
                      onClick={stopStreaming}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white"
                      title="Stop generating"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="8" y="8" width="10" height="10" rx="1" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Send message"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
