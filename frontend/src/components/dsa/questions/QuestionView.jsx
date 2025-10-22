import { useQuestions } from '@/hooks/useQuestions';
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, Loader2, FileText } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { SearchBar } from '../../common/SearchBar';
import { EmptyState } from '../../common/EmptyState';

export function QuestionsView({ selectedTopic, onBack }) {
  const { questions, error, isLoading, toggle, completed } = useQuestions(selectedTopic.id);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedMap, setCompletedMap] = useState({});

    useEffect(() => {
    const map = {};
    questions.forEach(q => {
      map[q.id] = completed.some(c => c.id === q.id)
    });
    setCompletedMap(map);
  }, [questions, completed]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesDifficulty =
        difficultyFilter === 'All' || q.difficulty === difficultyFilter;

      const matchesSearch = q.questionName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesDifficulty && matchesSearch;
    });
  }, [questions, difficultyFilter, searchTerm]);


  const handleToggle = (questionId) => {
    setCompletedMap(prev => ({
        ...prev,
        [questionId]: !prev[questionId]
      }));

      toggle.mutate(questionId);
  }

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-[#3dd68c] text-[#1a1f2e]';
      case 'Medium':
        return 'bg-[#f59e0b] text-white';
      case 'Hard':
        return 'bg-[#ef4444] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };


  return (
    <div>
      {/* ---------- HEADER ---------- */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="relative mb-6">
            <div aria-hidden="true" className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]" />
            <button
              onClick={onBack}
              className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] px-4 py-2 font-orbitron text-sm font-bold text-[#1a1f2e] dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO TOPICS
            </button>
          </div>

          <button className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-4 py-2 font-orbitron text-sm font-bold text-[#1a1f2e]">
            {selectedTopic.title}
          </button>
        </div>

        {/* ----------SEARCH AND FILTER HEADER---------- */}
        <div className="relative mb-6">
          <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2a2d35] dark:bg-[#0f1419]" />
          <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6">
              
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search questions..."
              />

            <p className="font-orbitron text-sm font-bold text-[#2a2d35] dark:text-[#c5d1de] mb-3 mt-8">
              FILTER BY DIFFICULTY
            </p>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((diff) => (
                <div key={diff} className="relative">
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 translate-x-1 translate-y-1 ${
                      difficultyFilter === diff
                        ? 'bg-[#2a2d35] dark:bg-[#0f1419]'
                        : 'bg-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setDifficultyFilter(diff)}
                    className={`relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] px-4 py-2 font-orbitron text-sm font-bold transition-all ${
                      difficultyFilter === diff
                        ? 'bg-[#3dd68c] text-[#1a1f2e]'
                        : 'bg-[#f5f5f5] dark:bg-[#1f2937] text-[#2a2d35] dark:text-[#c5d1de] hover:bg-white dark:hover:bg-[#273142]'
                    }`}
                  >
                    {diff.toUpperCase()}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ---------- QUESTIONS ---------- */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#3dd68c]" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <EmptyState icon={FileText} message="No questions found" />
        ) : (
          filteredQuestions.map((question) => {
            return (
              <div key={question.id} className="relative group">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2a2d35] dark:bg-[#0f1419] transition-transform group-hover:translate-x-3 group-hover:translate-y-3"
                />
                <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-5 transition-all group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={() => handleToggle(question.id)}
                        className="flex-shrink-0 text-[#3dd68c] hover:text-[#35c47d] transition-colors"
                      >
                        {completedMap[question.id] ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6 text-[#c5d1de] dark:text-[#5a6270]" />
                        )}
                      </button>

                      <div className="flex-1">
                        <h3
                          className={`font-orbitron text-lg font-bold ${
                            completedMap[question.id]
                              ? 'text-[#8b96a5] dark:text-[#5a6270] line-through'
                              : 'text-[#1a1f2e] dark:text-white'
                          }`}
                        >
                          {question.questionName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`border-2 border-[#2a2d35] dark:border-[#3a4a5f] px-3 py-1 text-xs font-orbitron font-bold ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {question.difficulty.toUpperCase()}
                      </div>

                      <button
                        onClick={() => window.open(question.link, '_blank')}
                        className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] px-3 py-1 text-[#1a1f2e] dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
