import {ArrowRight, Bug, CodeXml, FileText, Loader2} from 'lucide-react';
import { useTopics } from '@/hooks/useTopics';
import { SearchBar } from '../../common/SearchBar';
import { useState } from 'react';
import { EmptyState } from '../../common/EmptyState';

export function TopicsView({onViewQuestions}) {
  const { topics, isLoading } = useTopics();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = (Array.isArray(topics) ? topics : []).filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-orbitron text-4xl font-bold text-[#1a1f2e] dark:text-white mb-2">
          Master Data Structures & Algorithms
        </h1>
        <p className="text-[#5a6270] dark:text-[#8b96a5] text-lg">
          Choose a topic to start practicing problems
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search topics..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? 
        (<div className="flex justify-center items-center h-64">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2a2d35] dark:bg-[#0f1419]"
          />
          <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-8 flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#3dd68c] mb-3" />
            <p className="font-orbitron text-lg font-bold text-[#1a1f2e] dark:text-white">
              Loading topics...
            </p>
          </div>
        </div>
      </div>)
      : filteredTopics.length === 0 ?  
        <EmptyState icon={FileText} message="No topics found" />
      :  filteredTopics.map((topic) => {
          const IconComponent = CodeXml;
          return (
            <div key={topic.id} className="relative group">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2a2d35] dark:bg-[#0f1419] transition-transform group-hover:translate-x-3 group-hover:translate-y-3"
              />
              <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6 transition-all group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 h-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] p-3">
                      <IconComponent className="w-6 h-6 text-[#1a1f2e]" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-xl font-bold text-[#1a1f2e] dark:text-white">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-[#5a6270] dark:text-[#8b96a5]">
                        {topic.difficulty}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#f5f5f5] dark:bg-[#1f2937] px-3 py-1 text-sm font-orbitron font-bold text-[#2a2d35] dark:text-[#c5d1de] max-w-90">
                      {topic.description}
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-x-1 translate-y-1 bg-[#2a2d35] dark:bg-[#0f1419]"
                    />
                    <button
                      onClick={() => onViewQuestions(topic)}
                      className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-4 py-2 font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c47d] transition-colors flex items-center gap-2"
                    >
                      START
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
