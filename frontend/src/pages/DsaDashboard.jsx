import { useState } from "react";
import { TopicsView } from "../components/dsa/topics/TopicView";
import { QuestionsView } from "../components/dsa/questions/QuestionView";

export default function DsaDashboard() {
  const [currentView, setCurrentView] = useState("topics");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleBackToTopics = () => {
    setCurrentView("topics");
    setSelectedTopic(null);
  };

  const openTopicQuestions = (topic) => {
    setSelectedTopic(topic);
    setCurrentView("questions");
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] dark:bg-[#1A0D08] transition-colors duration-300 relative overflow-hidden px-6 py-8">
      {/* HEADER */}
      <header className="max-w-6xl mx-20 mb-12">
        <div className="flex items-center justify-between">
          {/* LOGO BOX */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-2 translate-y-2 bg-[#C1502E] dark:bg-[#F5E6D3]"
            />
            <div className="relative border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] px-4 py-3 font-black text-xl text-[#2C1810] dark:text-[#F5E6D3] tracking-wider shadow-[6px_6px_0px_0px_rgba(193,80,46,1)]">
              DSA TRACKER
            </div>
          </div>

        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="relative z-10 max-w-6xl mx-auto ">
        {currentView === "topics" && (
          <div className="animate-fadeInUp">
            <TopicsView onViewQuestions={openTopicQuestions} />
          </div>
        )}

        {currentView === "questions" && selectedTopic && (
          <div className="animate-fadeInUp">
            <QuestionsView
              selectedTopic={selectedTopic}
              onBack={handleBackToTopics}
            />
          </div>
        )}
      </main>

      {/* BACKGROUND SHAPES (Neo-Brutalist Deco) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C1502E] dark:bg-[#F5E6D3] rotate-12 opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#C1502E] dark:bg-[#F5E6D3] rotate-[30deg] opacity-10"></div>
    </div>
  );
}
