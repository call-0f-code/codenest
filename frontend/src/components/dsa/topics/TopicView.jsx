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
    <section className="px-6 py-20 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-4 inline-block border-b-8 border-[#C1502E] pb-2">
          Explore DSA Topics
        </h1>
        <p className="text-lg font-semibold text-[#4A2E1B] dark:text-[#D9C1AC]">
          Choose a topic to start practicing problems
        </p>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-14">
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
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {filteredTopics.map((topic, index) => {
  const IconComponent = CodeXml;
  const isEven = index % 2 === 0;

  return (
    <div
      key={topic.id}
      className={`relative flex flex-col md:flex-row items-stretch gap-10 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        className="relative w-full border-[3px] border-[#2C1810] dark:border-[#F5E6D3]
        bg-[#F5E6D3] dark:bg-[#2C1810]
        rounded-xl shadow-[8px_8px_0_#C1502E] hover:shadow-[12px_12px_0_#C1502E]
        overflow-hidden transition-all duration-300"
      >
        {/* Subtle paper texture */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat"></div>

        {/* Top floating tag */}
        <div className="absolute -top-4 left-6 bg-[#C1502E] text-[#F5E6D3] dark:bg-[#F5E6D3] dark:text-[#2C1810] border-2 border-[#2C1810] dark:border-[#F5E6D3] px-4 py-1 font-extrabold text-sm tracking-wider shadow-[3px_3px_0_#2C1810] uppercase">
          {topic.difficulty}
        </div>

        {/* Left accent bar */}
        <div className="absolute top-0 left-0 w-3 h-full bg-[#C1502E]" />

        {/* Content */}
        <div className="relative z-10 p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-xl bg-[#C1502E] dark:bg-[#F5E6D3] border-2 border-[#2C1810] dark:border-[#F5E6D3] shadow-[4px_4px_0_#2C1810]">
                <IconComponent className="w-8 h-8 text-[#F5E6D3] dark:text-[#2C1810]" />
              </div>
              <h3 className="text-3xl font-extrabold text-[#2C1810] dark:text-[#F5E6D3] tracking-tight uppercase">
                {topic.title}
              </h3>
            </div>

            {/* Rotated tag */}
            <div className="rotate-12 bg-[#F5E6D3] dark:bg-[#2C1810] border-2 border-[#2C1810] dark:border-[#F5E6D3] px-4 py-1 text-[#C1502E] dark:text-[#F5E6D3] font-black shadow-[2px_2px_0_#2C1810] text-xs tracking-widest uppercase">
              Topic {index + 1}
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-[#FFF6EE]/90 dark:bg-[#3B2415]/70 border-2 border-[#C1502E]/50 dark:border-[#F5E6D3]/40 rounded-xl shadow-[4px_4px_0_#C1502E] p-6 mb-8 backdrop-blur-sm">
            <p className="text-lg font-semibold text-[#2C1810] dark:text-[#F5E6D3] leading-relaxed">
              {topic.description}
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              onClick={() => onViewQuestions(topic)}
              className="relative px-8 py-3 border-2 border-[#2C1810] dark:border-[#F5E6D3]
              bg-[#C1502E] text-[#F5E6D3] dark:bg-[#F5E6D3] dark:text-[#2C1810]
              font-extrabold rounded-lg shadow-[4px_4px_0_#2C1810]
              hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#2C1810]
              transition-all duration-300 uppercase tracking-wider flex items-center gap-3"
            >
              Start <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[#C1502E]" />
      </div>
    </div>
  );
})}


        </div>
      )}
    </section>
  );
}
