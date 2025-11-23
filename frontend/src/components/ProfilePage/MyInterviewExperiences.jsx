import { useState } from "react";
import { FileText, X, AlertTriangle } from "lucide-react"; // Added AlertTriangle
import { useMemberInterviews } from "@/hooks/useMember";
import InterviewExperienceItem from "@/components/interview/InterviewExperienceItem";
 import InterviewExperienceForm from "@/components/interview/InterviewExperienceForm"; // Assuming this is used elsewhere or you might need it back

// --- Internal Neo-Brutalist Modal Component ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="
          relative w-full max-w-md p-8 
          bg-[#F5E6D3] dark:bg-[#2C1810] 
          border-4 border-black dark:border-[#F5E6D3] 
          shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#C1502E]
          animate-in zoom-in-95 duration-200
        "
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-[#C1502E] p-2 border-2 border-black dark:border-[#F5E6D3]">
            <AlertTriangle className="w-8 h-8 text-[#F5E6D3] dark:text-[#2C1810]" />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase text-[#2C1810] dark:text-[#F5E6D3] leading-none mb-2">
              Delete Experience?
            </h3>
            <p className="text-sm font-bold text-[#2C1810]/70 dark:text-[#F5E6D3]/70">
              This action cannot be undone. Are you sure you want to remove this?
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="
              px-6 py-2 font-black text-sm uppercase
              bg-transparent text-[#2C1810] dark:text-[#F5E6D3]
              border-4 border-black dark:border-[#F5E6D3]
              hover:bg-black/5 dark:hover:bg-[#F5E6D3]/10
              active:translate-x-[2px] active:translate-y-[2px]
              transition-all
            "
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="
              px-6 py-2 font-black text-sm uppercase
              bg-[#C1502E] text-[#F5E6D3]
              border-4 border-black dark:border-[#F5E6D3]
              shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#F5E6D3]
              hover:shadow-[2px_2px_0_0_#000] dark:hover:shadow-[2px_2px_0_0_#F5E6D3]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
              transition-all
            "
          >
            Yes, Delete It
          </button>
        </div>

        {/* Close Icon (Optional decorative) */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-[#2C1810] dark:text-[#F5E6D3]" />
        </button>
      </div>
    </div>
  );
};

const MyInterviewExperiences = ({ userId }) => {
  const [editingInterview, setEditingInterview] = useState(null);
  // New State for tracking which item is being deleted
  const [deleteId, setDeleteId] = useState(null);

  const { memberInterviews, isLoadingInterviews, deleteMemberInterview, updateMemberInterview } = useMemberInterviews(userId);

  // Open Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  // Confirm Action
  const confirmDelete = () => {
    if (deleteId) {
      deleteMemberInterview.mutate(deleteId);
      setDeleteId(null); // Close modal
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
            <div className="text-center font-bold text-xl animate-pulse text-[#2C1810] dark:text-[#F5E6D3]">
              Loading experiences...
            </div>
          ) : memberInterviews?.length > 0 ? (
            memberInterviews.map((interview) => (
              <InterviewExperienceItem
                key={interview.id}
                interview={interview}
                showProfileInfo={false}
                onEdit={(item) => {
                  setEditingInterview(item);
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
                // Pass the new click handler instead of the direct delete function
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-[#C1502E]/30 bg-[#F5E6D3]/10 dark:bg-[#2C1810]/10">
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

      {/* Render the Modal */}
      <ConfirmationModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={confirmDelete} 
      />
    </>
  );
};

export default MyInterviewExperiences;