import { ArrowRight, CodeXml, FileText, Loader2 } from "lucide-react";
import { useTopics } from "@/hooks/useTopics";
import { SearchBar } from "../../common/SearchBar";
import { useState } from "react";
import { EmptyState } from "../../common/EmptyState";

export function TopicsView({ onViewQuestions }) {
  const { topics, isLoading } = useTopics();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = (Array.isArray(topics) ? topics : []).filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="px-3 sm:px-6 py-8 sm:py-12 lg:py-20 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-3 sm:mb-4 inline-block border-b-4 sm:border-b-6 lg:border-b-8 border-[#C1502E] pb-2">
          Explore DSA Topics
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#4A2E1B] dark:text-[#D9C1AC] px-4">
          Choose a topic to start practicing problems
        </p>
      </div>

      {/* Search */}
      <div className="max-w-full sm:max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-14">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search topics..."
        />
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C1502E]"
            />
            <div className="relative border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] p-10 flex flex-col items-center shadow-[8px_8px_0px_0px_rgba(193,80,46,1)]">
              <Loader2 className="w-10 h-10 animate-spin text-[#C1502E] mb-3" />
              <p className="text-lg font-black text-[#2C1810] dark:text-[#F5E6D3]">
                Loading topics...
              </p>
            </div>
          </div>
        </div>
      ) : filteredTopics.length === 0 ? (
        <EmptyState icon={FileText} message="No topics found" />
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {filteredTopics.map((topic, index) => {
            const IconComponent = CodeXml;
            const isEven = index % 2 === 0;

            return (
              <div
                key={topic.id}
                className={`relative flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                <div
                  className="relative w-full border-2 sm:border-[3px] border-[#2C1810] dark:border-[#F5E6D3]
        bg-[#F5E6D3] dark:bg-[#2C1810]
        rounded-xl shadow-[4px_4px_0_#C1502E] sm:shadow-[6px_6px_0_#C1502E] lg:shadow-[8px_8px_0_#C1502E] hover:shadow-[6px_6px_0_#C1502E] sm:hover:shadow-[10px_10px_0_#C1502E] lg:hover:shadow-[12px_12px_0_#C1502E]
        overflow-hidden transition-all duration-300"
                >
                  {/* Subtle paper texture */}
                  <div className="absolute inset-0 opacity-10 dark:opacity-20 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat"></div>

                  {/* Top floating tag */}
                  <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 bg-[#C1502E] text-[#F5E6D3] dark:bg-[#F5E6D3] dark:text-[#2C1810] border-2 border-[#2C1810] dark:border-[#F5E6D3] px-3 py-0.5 sm:px-4 sm:py-1 font-extrabold text-xs sm:text-sm tracking-wider shadow-[2px_2px_0_#2C1810] sm:shadow-[3px_3px_0_#2C1810] uppercase">
                    {topic.difficulty}
                  </div>

                  {/* Left accent bar */}
                  <div className="absolute top-0 left-0 w-2 sm:w-3 h-full bg-[#C1502E]" />

                  {/* Content */}
                  <div className="relative z-10 p-5 sm:p-7 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-5 sm:mb-6 lg:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                        <div className="p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl bg-[#C1502E] dark:bg-[#F5E6D3] border-2 border-[#2C1810] dark:border-[#F5E6D3] shadow-[2px_2px_0_#2C1810] sm:shadow-[3px_3px_0_#2C1810] lg:shadow-[4px_4px_0_#2C1810]">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#F5E6D3] dark:text-[#2C1810]" />
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2C1810] dark:text-[#F5E6D3] tracking-tight uppercase">
                          {topic.title}
                        </h3>
                      </div>

                      {/* Rotated tag */}
                      <div className="rotate-6 sm:rotate-12 bg-[#F5E6D3] dark:bg-[#2C1810] border-2 border-[#2C1810] dark:border-[#F5E6D3] px-3 py-0.5 sm:px-4 sm:py-1 text-[#C1502E] dark:text-[#F5E6D3] font-black shadow-[2px_2px_0_#2C1810] text-[10px] sm:text-xs tracking-widest uppercase">
                        Topic {index + 1}
                      </div>
                    </div>

                    {/* Description Box */}
                    <div className="bg-[#FFF6EE]/90 dark:bg-[#3B2415]/70 border-2 border-[#C1502E]/50 dark:border-[#F5E6D3]/40 rounded-lg sm:rounded-xl shadow-[2px_2px_0_#C1502E] sm:shadow-[3px_3px_0_#C1502E] lg:shadow-[4px_4px_0_#C1502E] p-4 sm:p-5 lg:p-6 mb-5 sm:mb-6 lg:mb-8 backdrop-blur-sm">
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#2C1810] dark:text-[#F5E6D3] leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="flex justify-center sm:justify-end">
                      <button
                        onClick={() => onViewQuestions(topic)}
                        className="relative px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-[#2C1810] dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] dark:bg-[#F5E6D3] dark:text-[#2C1810] font-extrabold rounded-lg shadow-[3px_3px_0_#2C1810] sm:shadow-[4px_4px_0_#2C1810] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_#2C1810] sm:hover:shadow-[6px_6px_0_#2C1810] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#2C1810] transition-all duration-300 uppercase tracking-wider flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                      >
                        Start <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-[#C1502E]" />
                </div>
              </div>
            );
          })}


        </div>
      )}
    </section>
  );
}
