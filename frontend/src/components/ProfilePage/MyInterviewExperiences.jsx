import { useState } from "react";
import { FileText, X } from "lucide-react";
import { useMemberInterviews } from "@/hooks/useMember";
import InterviewExperienceItem from "@/components/interview/InterviewExperienceItem";
import InterviewExperienceForm from "@/components/interview/InterviewExperienceForm";


const MyInterviewExperiences = ({ userId }) => {
  const [editingInterview, setEditingInterview] = useState(null);
  // Fetch interviews for the current user
  const { memberInterviews, isLoadingInterviews, deleteMemberInterview, updateMemberInterview } = useMemberInterviews(userId);


  const handleDeleteInterview = (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      deleteMemberInterview.mutate(id);
    }
  };

  const handleUpdateInterview = (data) => {
    if (editingInterview) {
      updateMemberInterview.mutate({ id: editingInterview.id, data });
      setEditingInterview(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8 border-b-4 border-black dark:border-[#F5E6D3] pb-4">
        <FileText className="w-10 h-10 text-[#C1502E]" />
        <h2 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3] uppercase">
          MY INTERVIEW EXPERIENCES
        </h2>
      </div>

      {editingInterview ? (
        <div className="relative mt-8">
          <button
            onClick={() => setEditingInterview(null)}
            className="absolute -top-12 right-0 z-30 bg-[#C1502E] text-white px-4 py-2 font-black border-4 border-black dark:border-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-2"
          >
            <X className="w-6 h-6" /> CANCEL EDIT
          </button>

          <InterviewExperienceForm
            initialData={editingInterview}
            onSubmit={handleUpdateInterview}
            isPending={updateMemberInterview.isPending}
            onSuccess={() => setEditingInterview(null)}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {isLoadingInterviews ? (
            <div className="text-center font-bold text-xl animate-pulse">
              Loading experiences...
            </div>
          ) : memberInterviews?.length > 0 ? (
            memberInterviews.map((interview) => (
              <InterviewExperienceItem
                key={interview.id}
                interview={interview}
                showProfileInfo={false} // Don't show self profile
                onEdit={(item) => {
                  setEditingInterview(item);
                  // Scroll to form
                  setTimeout(() => {
                    const formElement = document.querySelector(".relative.mt-8");
                    if (formElement) {
                      formElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }, 100);
                }}
                onDelete={handleDeleteInterview}
              />
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-[#C1502E]/30">
              <h3 className="text-xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
                NO EXPERIENCES SHARED YET
              </h3>
              <p className="text-[#C1502E] font-bold">
                Go to the Interview Experiences page to post your first one!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyInterviewExperiences;