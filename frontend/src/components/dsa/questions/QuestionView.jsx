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
    <section className="min-h-screen py-10">
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        {/* Back Button */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2C1810] dark:bg-[#F5E6D3]"
          />
          <button
            onClick={onBack}
            className="relative border-4 border-black bg-[#2C1810] dark:bg-[#F5E6D3] text-[#F5E6D3] dark:text-[#2C1810] px-6 py-3 font-extrabold flex items-center gap-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK TO TOPICS
          </button>
        </div>

        {/* Topic Tag */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2C1810] dark:bg-[#F5E6D3]"
          />
          <button className="relative border-4 border-black bg-[#C1502E] text-white px-6 py-3 font-extrabold shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            {selectedTopic.title}
          </button>
        </div>
      </div>

      {/* ---------- SEARCH + FILTER ---------- */}
      <div className="mb-12">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search questions..."
        />

        <div className="mt-10">
          <p className="text-lg font-extrabold text-[#2C1810] dark:text-[#F5E6D3] mb-4 tracking-wide">
            FILTER BY DIFFICULTY
          </p>
          <div className="flex flex-wrap gap-4">
            {difficulties.map((diff) => (
              <div key={diff} className="relative">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 translate-x-2 translate-y-2 ${
                    difficultyFilter === diff
                      ? "bg-[#2C1810] dark:bg-[#F5E6D3]"
                      : "bg-transparent"
                  }`}
                />
                <button
                  onClick={() => setDifficultyFilter(diff)}
                  className={`relative border-4 border-black px-6 py-2 font-extrabold shadow-[5px_5px_0_0_rgba(0,0,0,1)] transition-all duration-200 ${
                    difficultyFilter === diff
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
          <Loader2 className="w-10 h-10 animate-spin text-[#C1502E]" />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <EmptyState icon={FileText} message="No questions found" />
      ) : (
        <div className="space-y-8">
          {filteredQuestions.map((question) => (
  <div key={question.id} className="relative group mb-12">
    {/* Layered block background (non-interactive) */}
    <div
      className="absolute inset-0 -rotate-1 translate-x-3 translate-y-3 bg-[#2C1810] dark:bg-[#F5E6D3] rounded-lg transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4 pointer-events-none"
    />
    <div
      className="absolute inset-0 rotate-2 translate-x-1 translate-y-1 bg-[#b05a3c]/60 rounded-lg blur-[1px] pointer-events-none"
    />

    {/* Main floating card */}
    <div
      className="relative border-4 border-black bg-[#FFF6EE] dark:bg-[#2C1810]
      p-8 rounded-lg shadow-[10px_10px_0_0_#2C1810]
      hover:shadow-[12px_12px_0_0_#C1502E]
      transition-all duration-300 hover:-translate-y-2"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3
            className={`text-2xl font-extrabold leading-snug ${
              completedMap[question.id]
                ? "text-[#a88d80] line-through"
                : "text-[#2C1810] dark:text-[#F5E6D3]"
            }`}
          >
            {question.questionName}
          </h3>
        </div>

        <div
          className={`text-sm font-black tracking-wider border-4 border-black 
          px-4 py-1 bg-[#C1502E] text-[#FFF6EE] dark:bg-[#F5E6D3] dark:text-[#2C1810]
          shadow-[3px_3px_0_0_#2C1810]`}
        >
          {question.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Divider bar */}
      <div className="h-1 mt-5 mb-6 bg-[#C1502E] dark:bg-[#F5E6D3] rounded-full w-2/3 group-hover:w-full transition-all duration-300"></div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleToggle(question.id)}
          disabled={toggle.isPending}
          className={`flex items-center gap-3 font-extrabold text-[#2C1810] dark:text-[#F5E6D3] ${
            toggle.isPending ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {completedMap[question.id] ? (
            <CheckCircle2 className="w-8 h-8 text-[#3dd68c]" />
          ) : (
            <Circle className="w-8 h-8 text-[#b05a3c] dark:text-[#F5E6D3]" />
          )}
          <span className="text-sm uppercase">
            {toggle.isPending ? "Updating..." : "Mark Done"}
          </span>
        </button>

        <button
          onClick={() =>
            window.open(question.link, "_blank", "noopener,noreferrer")
          }
          className="relative border-4 border-black bg-[#F5E6D3] dark:bg-[#FFF6EE] 
          p-3 font-black hover:-translate-x-0.5 hover:-translate-y-0.5
          shadow-[4px_4px_0_0_#2C1810] transition-transform group/link"
        >
          <ExternalLink className="w-5 h-5 text-[#2C1810]" />
          <span className="absolute -bottom-5 left-0 opacity-0 group-hover/link:opacity-100 text-xs font-extrabold text-[#2C1810] dark:text-[#F5E6D3] transition-all">
            Open
          </span>
        </button>
      </div>

      {/* Floating animated accent */}
      <div className="absolute -bottom-2 right-6 w-20 h-20 bg-gradient-to-tr from-[#C1502E40] to-transparent blur-2xl rounded-full animate-pulse pointer-events-none" />
    </div>
  </div>
))}

        </div>
      )}
    </section>
  );
}
