import { Briefcase } from "lucide-react";

export default function InterviewHeader() {
  return (
    <div className="mb-12">
      <div className="inline-block bg-[#C1502E] px-6 py-3 border-4 border-black font-black -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
        <span className="text-[#F5E6D3] flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          INTERVIEW EXPERIENCES
        </span>
      </div>
      
      <h1 className="text-6xl lg:text-7xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-4">
        SHARE YOUR
        <br />
        <span className="text-[#C1502E]">JOURNEY.</span>
      </h1>
      
      <p className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6D3] max-w-2xl">
        Help fellow coders by sharing your interview experiences. Every story matters!
      </p>
    </div>
  );
}