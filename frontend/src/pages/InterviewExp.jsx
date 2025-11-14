import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInterview } from "@/hooks/useInterviews";
import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewFilters from "@/components/interview/InterviewFilters";
import InterviewExperienceForm from "@/components/interview/InterviewExperienceForm";
import InterviewExperienceItem from "@/components/interview/InterviewExperienceItem";

export default function InterviewExperiences() {
  const { interviews, isLoading, postInterviewExp,page,setPage,totalPages } = useInterview();
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  // Ensure interviews is always an array
  const interviewsArray = Array.isArray(interviews) ? interviews : [];

  const filteredInterviews = filter === "All" 
    ? interviewsArray 
    : interviewsArray.filter(i => i.verdict === filter);

  const handleFormSubmit = (data) => {
    postInterviewExp.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] dark:bg-[#1a0f0a] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Button */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-8 flex-wrap">
            {/* Left: Header Content */}
            <motion.div 
              className="flex-1 min-w-[300px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-block bg-[#C1502E] px-6 py-3 border-4 border-black dark:border-[#F5E6D3] font-black -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] mb-6"
                whileHover={{ 
                  rotate: -1, 
                  boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" 
                }}
              >
                <span className="text-[#F5E6D3] flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  INTERVIEW EXPERIENCES
                </span>
              </motion.div>
              
              <h1 className="text-6xl lg:text-7xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-4 leading-none">
                SHARE YOUR
                <br />
                <motion.span 
                  className="text-[#C1502E] inline-block"
                  whileHover={{ rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  JOURNEY.
                </motion.span>
              </h1>
              
              <p className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6D3] max-w-2xl">
                Help fellow coders by sharing your interview experiences. Every story matters!
              </p>
            </motion.div>

            {/* Right: Add Experience Button with Decorative Elements */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Decorative squares */}
              <motion.div 
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] -z-10"
                animate={{ rotate: [12, 18, 12] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#F5E6D3] dark:bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] -z-10"
                animate={{ rotate: [-12, -18, -12] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.button
                onClick={() => setShowForm(!showForm)}
                className="group relative px-8 py-6 bg-[#C1502E] text-[#F5E6D3] text-xl font-black border-4 border-black dark:border-[#F5E6D3]"
                whileHover={{ 
                  x: -4, 
                  y: -4,
                  boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)"
                }}
                whileTap={{ 
                  x: 4, 
                  y: 4,
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)"
                }}
                style={{
                  boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
                }}
              >
                <span className="flex items-center gap-3">
                  <motion.svg 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showForm ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    )}
                  </motion.svg>
                  {showForm ? "CLOSE" : "ADD EXPERIENCE"}
                </span>
                
                {/* Animated corner accent */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-4 h-4 bg-[#F5E6D3] border-2 border-black dark:border-[#F5E6D3]"
                  whileHover={{ rotate: 45 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Form with entrance animation */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InterviewExperienceForm 
                onSuccess={() => setShowForm(false)}
                onSubmit={handleFormSubmit}
                isPending={postInterviewExp.isPending}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters with enhanced styling */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <InterviewFilters 
            activeFilter={filter} 
            onFilterChange={setFilter} 
          />
        </motion.div>

        {/* Experiences List */}
        {isLoading ? (
          <div className="text-center py-12">
            <motion.div 
              className="inline-block bg-[#2C1810] dark:bg-[#F5E6D3] px-8 py-4 border-4 border-black dark:border-[#2C1810] shadow-[6px_6px_0px_0px_rgba(193,80,46,1)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="font-black text-[#F5E6D3] dark:text-[#2C1810]">
                LOADING EXPERIENCES...
              </span>
            </motion.div>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="text-center py-12">
            <motion.div 
              className="inline-block bg-[#2C1810] dark:bg-[#F5E6D3] px-8 py-4 border-4 border-black dark:border-[#2C1810] -rotate-2 shadow-[6px_6px_0px_0px_rgba(193,80,46,1)]"
              whileHover={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-black text-[#F5E6D3] dark:text-[#2C1810]">
                NO EXPERIENCES FOUND
              </span>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredInterviews.map((interview, index) => (
                <motion.div 
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05
                  }}
                >
                  <InterviewExperienceItem interview={interview} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        {/*  PAGINATION BLOCK ADDED */}
        {!isLoading && filteredInterviews.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-6 py-3 bg-[#C1502E] text-[#F5E6D3] text-lg font-black border-4 border-black 
                          dark:border-[#F5E6D3] disabled:opacity-40 disabled:cursor-not-allowed
                          hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                          transition-transform"
            >
              PREVIOUS
            </button>

            <span className="font-black text-2xl text-[#2C1810] dark:text-[#F5E6D3]">
              PAGE {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-6 py-3 bg-[#C1502E] text-[#F5E6D3] text-lg font-black border-4 border-black 
                          dark:border-[#F5E6D3] disabled:opacity-40 disabled:cursor-not-allowed
                          hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                          transition-transform"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}