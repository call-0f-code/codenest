import { useState } from "react";
import { useInterview } from "@/hooks/useInterviews";
import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewFilters from "@/components/interview/InterviewFilters";
import InterviewExperienceForm from "@/components/interview/InterviewExperienceForm";
import InterviewExperienceItem from "@/components/interview/InterviewExperienceItem";

export default function InterviewExperiences() {
  const { interviews, isLoading, postInterviewExp } = useInterview();
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
        <InterviewHeader />

        {/* Toggle Form Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-8 px-8 py-4 bg-[#C1502E] text-[#F5E6D3] text-lg font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
        >
          {showForm ? "HIDE FORM" : "+ ADD YOUR EXPERIENCE"}
        </button>

        {/* Form */}
        {showForm && (
          <div className="mb-12">
            <InterviewExperienceForm 
              onSuccess={() => setShowForm(false)}
              onSubmit={handleFormSubmit}
              isPending={postInterviewExp.isPending}
            />
          </div>
        )}

        {/* Filters */}
        <InterviewFilters 
          activeFilter={filter} 
          onFilterChange={setFilter} 
        />

        {/* Experiences List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block bg-[#2C1810] dark:bg-[#F5E6D3] px-8 py-4 border-4 border-black animate-pulse">
              <span className="font-black text-[#F5E6D3] dark:text-[#2C1810]">
                LOADING EXPERIENCES...
              </span>
            </div>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block bg-[#2C1810] dark:bg-[#F5E6D3] px-8 py-4 border-4 border-black -rotate-2">
              <span className="font-black text-[#F5E6D3] dark:text-[#2C1810]">
                NO EXPERIENCES FOUND
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInterviews.map((interview) => (
              <InterviewExperienceItem key={interview.id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}