import { useState } from "react";
import { Briefcase, Send, Eye, EyeOff, Trophy, XCircle, Clock } from "lucide-react";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import { VERDICT_OPTIONS } from "@/constants/interviewConstants";

export default function InterviewExperienceForm({ onSuccess, onSubmit, isPending }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    verdict: "Pending",
    isAnonymous: false
  });
  const [editorContent, setEditorContent] = useState("");

  const handleSubmit = () => {
    // Validate
    if (!formData.company || !formData.role || editorContent.length < 10) {
      alert("Please fill all required fields. Content must be at least 10 characters.");
      return;
    }

    const submitData = {
      ...formData,
      content: editorContent
    };

    onSubmit(submitData);
    
    // Reset
    setFormData({
      company: "",
      role: "",
      verdict: "Pending",
      isAnonymous: false
    });
    setEditorContent("");
    
    if (onSuccess) onSuccess();
  };

  const getVerdictIcon = (verdict) => {
    switch(verdict) {
      case "Selected": return Trophy;
      case "Rejected": return XCircle;
      case "Pending": return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black shadow-[12px_12px_0px_0px_rgba(193,80,46,1)] p-8 rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#C1502E] p-3 border-4 border-black -rotate-6">
          <Briefcase className="h-6 w-6 text-[#F5E6D3]" />
        </div>
        <h3 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3]">
          SHARE YOUR EXPERIENCE
        </h3>
      </div>

      <div className="space-y-6">
        {/* Company & Role */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
              COMPANY *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-3 bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] border-4 border-black font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] transition-all"
              placeholder="e.g., Google"
            />
          </div>
          
          <div>
            <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
              ROLE *
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] border-4 border-black font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] transition-all"
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>

        {/* Verdict */}
        <div>
          <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
            VERDICT *
          </label>
          <div className="flex flex-wrap gap-4">
            {VERDICT_OPTIONS.map((verdict) => {
              const Icon = getVerdictIcon(verdict);
              return (
                <button
                  key={verdict}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, verdict }))}
                  className={`px-6 py-3 font-black border-4 border-black transition-all ${
                    formData.verdict === verdict
                      ? "bg-[#C1502E] text-[#F5E6D3] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <Icon className="inline h-5 w-5 mr-2" />
                  {verdict.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        <div>
          <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
            YOUR EXPERIENCE * (min 10 characters)
          </label>
          <div className="border-4 border-black bg-white dark:bg-[#2C1810]">
            <MinimalTiptap
              value={editorContent}
              onChange={setEditorContent}
              className="w-full min-h-[200px]"
              editorContentClassName="p-4"
              placeholder="Share your interview experience..."
            />
          </div>
          <p className="text-xs font-bold text-[#2C1810] dark:text-[#F5E6D3] mt-2">
            {editorContent.length} characters
          </p>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
            className={`flex items-center gap-3 px-6 py-3 font-black border-4 border-black transition-all ${
              formData.isAnonymous
                ? "bg-[#C1502E] text-[#F5E6D3]"
                : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3]"
            }`}
          >
            {formData.isAnonymous ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            POST ANONYMOUSLY
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full group px-8 py-5 bg-[#C1502E] text-[#F5E6D3] text-xl font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <Send className="h-6 w-6" />
          {isPending ? "POSTING..." : "POST EXPERIENCE"}
        </button>
      </div>
    </div>
  );
}