import { useState } from 'react';
import { TopicsView } from '../components/dsa/topics/TopicView';
import { QuestionsView } from '../components/dsa/questions/QuestionView';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function DsaDashboard() {
  const [currentView, setCurrentView] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { theme, toggleTheme } = useTheme();


  const handleBackToTopics = () => {
    setCurrentView('topics');
    setSelectedTopic(null);
  };

    const openTopicQuestions = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('questions');
    
  };

  return (
    <div className="min-h-screen bg-[#e8eaed] dark:bg-[#1a1f2e] transition-colors duration-300 p-4 md:p-8 relative overflow-hidden">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-4 py-2  text-sm font-bold text-[#1a1f2e]">
              DSA TRACKER
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <button
              onClick={toggleTheme}
              className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-2 text-[#2a2d35] dark:text-[#c5d1de] hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto">
        {currentView === 'topics' && (
          <TopicsView 
            onViewQuestions={openTopicQuestions}
           />
        )}

        {currentView === 'questions' && selectedTopic && (
          <QuestionsView
            selectedTopic={selectedTopic}
            onBack={handleBackToTopics}
          />
        )}
      </div>
    </div>
  );
}
