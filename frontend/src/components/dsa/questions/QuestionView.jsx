import { useQuestions } from "@/hooks/useQuestions";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ExternalLink,
  Loader2,
  FileText,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../../common/SearchBar";
import { EmptyState } from "../../common/EmptyState";

export function QuestionsView({ selectedTopic, onBack }) {
  const { questions, isLoading, toggle, completed } = useQuestions(selectedTopic.id);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    const map = {};
    questions.forEach((q) => {
      map[q.id] = completed.some((c) => c.questionId === q.id);
    });
    setCompletedMap(map);
  }, [questions, completed]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesDifficulty =
        difficultyFilter === "All" || q.difficulty === difficultyFilter;
      const matchesSearch = q.questionName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });
  }, [questions, difficultyFilter, searchTerm]);

  const handleToggle = (questionId) => {
    toggle.mutate(questionId, {
      onSuccess: () => {
        setCompletedMap((prev) => ({
          ...prev,
          [questionId]: !prev[questionId],
        }));
      },
    });
  };

  const difficulties = ["All", "Easy", "Medium", "Hard"];


  return (
    <section className="min-h-screen py-6 sm:py-8 lg:py-10">
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
        {/* Back Button */}
        <div className="relative w-full sm:w-auto">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 bg-[#2C1810] dark:bg-[#F5E6D3]"
          />
          <button
            onClick={onBack}
            className="relative w-full sm:w-auto border-3 sm:border-4 border-black bg-[#2C1810] dark:bg-[#F5E6D3] text-[#F5E6D3] dark:text-[#2C1810] px-5 py-2.5 sm:px-6 sm:py-3 font-extrabold flex items-center justify-center gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-transform text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            BACK TO TOPICS
          </button>
        </div>

        {/* Topic Tag */}
        <div className="relative w-full sm:w-auto sm:self-start">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 bg-[#2C1810] dark:bg-[#F5E6D3]"
          />
          <button className="relative w-full sm:w-auto border-3 sm:border-4 border-black bg-[#C1502E] text-white px-5 py-2.5 sm:px-6 sm:py-3 font-extrabold shadow-[4px_4px_0_0_rgba(0,0,0,1)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-sm sm:text-base">
            {selectedTopic.title}
          </button>
        </div>
      </div>

      {/* ---------- SEARCH + FILTER ---------- */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search questions..."
        />

        <div className="mt-6 sm:mt-8 lg:mt-10">
          <p className="text-base sm:text-lg font-extrabold text-[#2C1810] dark:text-[#F5E6D3] mb-3 sm:mb-4 tracking-wide">
            FILTER BY DIFFICULTY
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {difficulties.map((diff) => (
              <div key={diff} className="relative">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 ${difficultyFilter === diff
                      ? "bg-[#2C1810] dark:bg-[#F5E6D3]"
                      : "bg-transparent"
                    }`}
                />
                <button
                  onClick={() => setDifficultyFilter(diff)}
                  className={`relative border-3 sm:border-4 border-black px-4 py-1.5 sm:px-6 sm:py-2 font-extrabold shadow-[3px_3px_0_0_rgba(0,0,0,1)] sm:shadow-[5px_5px_0_0_rgba(0,0,0,1)] transition-all duration-200 text-sm sm:text-base ${difficultyFilter === diff
                      ? "bg-[#C1502E] text-white"
                      : "bg-[#FFF6EE] text-[#2C1810] hover:-translate-x-1 hover:-translate-y-1"
                    }`}
                >
                  {diff.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- QUESTIONS ---------- */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#C1502E]" />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <EmptyState icon={FileText} message="No questions found" />
      ) : (
        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="relative group mb-6 sm:mb-8 lg:mb-12">
              {/* Layered block background (non-interactive) */}
              <div
                className="hidden sm:block absolute inset-0 -rotate-1 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 bg-[#2C1810] dark:bg-[#F5E6D3] rounded-lg transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3 sm:group-hover:translate-x-4 sm:group-hover:translate-y-4 pointer-events-none"
              />
              <div
                className="hidden sm:block absolute inset-0 rotate-2 translate-x-0.5 translate-y-0.5 sm:translate-x-1 sm:translate-y-1 bg-[#b05a3c]/60 rounded-lg blur-[1px] pointer-events-none"
              />

              {/* Main floating card */}
              <div
                className="relative border-3 sm:border-4 border-black bg-[#FFF6EE] dark:bg-[#2C1810]
      p-5 sm:p-6 lg:p-8 rounded-lg shadow-[4px_4px_0_0_#2C1810] sm:shadow-[8px_8px_0_0_#2C1810] lg:shadow-[10px_10px_0_0_#2C1810]
      hover:shadow-[6px_6px_0_0_#C1502E] sm:hover:shadow-[10px_10px_0_0_#C1502E] lg:hover:shadow-[12px_12px_0_0_#C1502E]
      transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 lg:gap-6">
                  <div className="flex-1">
                    <h3
                      className={`text-lg sm:text-xl lg:text-2xl font-extrabold leading-snug ${completedMap[question.id]
                          ? "text-[#a88d80] line-through"
                          : "text-[#2C1810] dark:text-[#F5E6D3]"
                        }`}
                    >
                      {question.questionName}
                    </h3>
                  </div>

                  <div
                    className={`text-xs sm:text-sm font-black tracking-wider border-2 sm:border-3 lg:border-4 border-black 
          px-3 py-1 sm:px-4 sm:py-1 bg-[#C1502E] text-[#FFF6EE] dark:bg-[#F5E6D3] dark:text-[#2C1810]
          shadow-[2px_2px_0_0_#2C1810] sm:shadow-[3px_3px_0_0_#2C1810] whitespace-nowrap`}
                  >
                    {question.difficulty.toUpperCase()}
                  </div>
                </div>

                {/* Divider bar */}
                <div className="h-0.5 sm:h-1 mt-3 sm:mt-4 lg:mt-5 mb-4 sm:mb-5 lg:mb-6 bg-[#C1502E] dark:bg-[#F5E6D3] rounded-full w-1/2 sm:w-2/3 group-hover:w-full transition-all duration-300"></div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                  <button
                    onClick={() => handleToggle(question.id)}
                    disabled={toggle.isPending}
                    className={`flex items-center gap-2 sm:gap-3 font-extrabold text-[#2C1810] dark:text-[#F5E6D3] ${toggle.isPending ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                  >
                    {completedMap[question.id] ? (
                      <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#3dd68c]" />
                    ) : (
                      <Circle className="w-7 h-7 sm:w-8 sm:h-8 text-[#b05a3c] dark:text-[#F5E6D3]" />
                    )}
                    <span className="text-xs sm:text-sm uppercase">
                      {toggle.isPending ? "Updating..." : "Mark Done"}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      window.open(question.link, "_blank", "noopener,noreferrer")
                    }
                    className="relative border-3 sm:border-4 border-black bg-[#F5E6D3] dark:bg-[#FFF6EE] 
          p-2.5 sm:p-3 font-black hover:-translate-x-0.5 hover:-translate-y-0.5
          shadow-[3px_3px_0_0_#2C1810] sm:shadow-[4px_4px_0_0_#2C1810] transition-transform group/link"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-[#2C1810]" />
                    <span className="absolute -bottom-4 sm:-bottom-5 left-0 opacity-0 group-hover/link:opacity-100 text-[10px] sm:text-xs font-extrabold text-[#2C1810] dark:text-[#F5E6D3] transition-all">
                      Open
                    </span>
                  </button>
                </div>

                {/* Floating animated accent */}
                <div className="absolute -bottom-2 right-4 sm:right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#C1502E40] to-transparent blur-2xl rounded-full animate-pulse pointer-events-none" />
              </div>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}
