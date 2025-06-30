import { useEffect, useState } from "react";
import { Building, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import axios from "axios";

const interviewExperiences = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    verdict: "Selected",
    candidate: "John Doe",
    content:
      "The interview process was thorough and challenging. Started with a phone screen focusing on data structures, followed by multiple onsite rounds covering algorithms, system design, and behavioral questions. The interviewers were very professional and gave hints when I was stuck. Key advice: practice system design extensively and be ready to explain your thought process clearly. The coding questions were medium to hard level, mostly involving trees and dynamic programming.",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "SDE II",
    verdict: "Selected",
    candidate: "Jane Smith",
    content:
      "Great experience overall. The interviewers were friendly and the questions were fair. Heavy focus on problem-solving and coding skills with some system design discussions. Had 4 rounds total - 2 coding rounds, 1 system design, and 1 behavioral. The coding questions were well-balanced and tested different aspects of programming. Make sure to communicate your approach before diving into code.",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Software Development Engineer",
    verdict: "Rejected",
    candidate: "Mike Johnson",
    content:
      "The process was well-structured but quite intense. Leadership Principles questions were heavily emphasized along with coding challenges. Unfortunately didn't make it past the final round due to a system design question I couldn't complete in time. Advice: Study Amazon's Leadership Principles thoroughly and practice system design under time pressure.",
  },
  {
    id: 4,
    company: "Meta",
    role: "Software Engineer E4",
    verdict: "Selected",
    candidate: "Sarah Chen",
    content:
      "Challenging but fair interview process. Strong emphasis on coding efficiency, system design at scale, and cultural fit. The behavioral rounds were particularly important and they really dig deep into past experiences. Technical rounds included coding problems focused on algorithms and data structures, plus a system design round for scalability challenges.",
  },
  {
    id: 5,
    company: "Netflix",
    role: "Senior Software Engineer",
    verdict: "Pending",
    candidate: "Alex Rodriguez",
    content:
      "Unique interview process focused heavily on real-world problem solving and scalability challenges. Less focus on traditional algorithmic questions and more on practical engineering problems. Still waiting for the final decision but the experience was refreshing compared to other tech companies.",
  },
];

const companies = ["All", "Google", "Microsoft", "Amazon", "Meta", "Netflix"];
const verdicts = ["All", "Selected", "Rejected", "Pending"];

const InterviewExp = () => {
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedVerdict, setSelectedVerdict] = useState("All");
  const [expandedItems, setExpandedItems] = useState({});

  const [experiences , setExperiences] = useState([]);

  const filteredExperiences = interviewExperiences.filter((exp) => {
    return (
      (selectedCompany === "All" || exp.company === selectedCompany) &&
      (selectedVerdict === "All" || exp.verdict === selectedVerdict)
    );
  });

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case "Selected":
        return "bg-green-600 text-green-100";
      case "Rejected":
        return "bg-red-600 text-red-100";
      case "Pending":
        return "bg-yellow-600 text-yellow-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(()=>{
    const fetchExperiences = async()=>{
      try{
        const res = await axios.get("http://localhost:3000/api/v1/getInteviewExp" , {
          headers : {"Content-Type" : "application/json"},
          withCredentials : true,
        });
        console.log(res);
        if(res.data.success){
          setExperiences(res.data.data);
        }

      }
      catch(err){
        alert(err.response.data.message);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Interview Experiences</h1>
        <p className="text-gray-400">Learn from real interview experiences shared by the community</p>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Company</h3>
          <div className="flex gap-2 flex-wrap">
            {companies.map((company) => (
              <Button
                key={company}
                variant={selectedCompany === company ? "default" : "outline"}
                size="sm"
                className={`${
                  selectedCompany === company
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setSelectedCompany(company)}
              >
                {company}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Result</h3>
          <div className="flex gap-2 flex-wrap">
            {verdicts.map((verdict) => (
              <Button
                key={verdict}
                variant={selectedVerdict === verdict ? "default" : "outline"}
                size="sm"
                className={`${
                  selectedVerdict === verdict
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setSelectedVerdict(verdict)}
              >
                {verdict}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Experiences */}
      <div className="space-y-6">
        {experiences.map((exp) => (
          <Collapsible
            key={exp._id}
            open={expandedItems[exp._id]}
            onOpenChange={() => toggleExpanded(exp._id)}
          >
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                    </div>
                    <p className="text-gray-400">{exp.role}</p>
                  </div>
                </div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerdictColor(exp.verdict)}`}>
                  {exp.verdict}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>by {exp.candidate}</span>
                </div>

                <CollapsibleTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {expandedItems[exp.id] ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Read Full Experience
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-4">
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-lg font-medium text-white mb-3">Interview Experience</h4>
                  <p className="text-gray-300 leading-relaxed">{exp.content}</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default InterviewExp;
