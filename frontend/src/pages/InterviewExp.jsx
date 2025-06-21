import { useState } from "react";
import { Building, Calendar, MapPin, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const interviewExperiences = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    location: "Mountain View, CA",
    date: "2024-01-10",
    difficulty: "Hard",
    result: "Selected",
    rounds: 5,
    rating: 4.5,
    likes: 145,
    author: "John Doe",
    excerpt: "The interview process was thorough and challenging. Started with a phone screen focusing on data structures, followed by multiple onsite rounds covering algorithms, system design, and behavioral questions...",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "SDE II",
    location: "Seattle, WA",
    date: "2024-01-08",
    difficulty: "Medium",
    result: "Selected",
    rounds: 4,
    rating: 4.2,
    likes: 98,
    author: "Jane Smith",
    excerpt: "Great experience overall. The interviewers were friendly and the questions were fair. Heavy focus on problem-solving and coding skills with some system design discussions...",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Software Development Engineer",
    location: "Austin, TX",
    date: "2024-01-05",
    difficulty: "Medium",
    result: "Rejected",
    rounds: 3,
    rating: 3.8,
    likes: 67,
    author: "Mike Johnson",
    excerpt: "The process was well-structured but quite intense. LP questions were heavily emphasized along with coding challenges. Unfortunately didn't make it past the final round...",
  },
  {
    id: 4,
    company: "Meta",
    role: "Software Engineer E4",
    location: "Menlo Park, CA",
    date: "2024-01-03",
    difficulty: "Hard",
    result: "Selected",
    rounds: 6,
    rating: 4.7,
    likes: 203,
    author: "Sarah Chen",
    excerpt: "Challenging but fair interview process. Strong emphasis on coding efficiency, system design at scale, and cultural fit. The behavioral rounds were particularly important...",
  },
  {
    id: 5,
    company: "Netflix",
    role: "Senior Software Engineer",
    location: "Los Gatos, CA",
    date: "2023-12-28",
    difficulty: "Hard",
    result: "Selected",
    rounds: 4,
    rating: 4.4,
    likes: 87,
    author: "Alex Rodriguez",
    excerpt: "Unique interview process focused heavily on real-world problem solving and scalability challenges. Less focus on traditional algorithmic questions...",
  },
];

const companies = ["All", "Google", "Microsoft", "Amazon", "Meta", "Netflix"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const results = ["All", "Selected", "Rejected"];

const InterviewExp = () => {
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedResult, setSelectedResult] = useState("All");

  const filteredExperiences = interviewExperiences.filter(exp => {
    return (selectedCompany === "All" || exp.company === selectedCompany) &&
           (selectedDifficulty === "All" || exp.difficulty === selectedDifficulty) &&
           (selectedResult === "All" || exp.result === selectedResult);
  });

  // const getDifficultyColor = (difficulty: string) => {
  //   switch (difficulty) {
  //     case "Easy": return "bg-green-600 text-green-100";
  //     case "Medium": return "bg-yellow-600 text-yellow-100";
  //     case "Hard": return "bg-red-600 text-red-100";
  //     default: return "bg-gray-600 text-gray-100";
  //   }
  // };

  // const getResultColor = (result: string) => {
  //   return result === "Selected" ? "bg-green-600 text-green-100" : "bg-red-600 text-red-100";
  // };

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

        <div className="flex gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Difficulty</h3>
            <div className="flex gap-2">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  className={`${
                    selectedDifficulty === difficulty 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Result</h3>
            <div className="flex gap-2">
              {results.map((result) => (
                <Button
                  key={result}
                  variant={selectedResult === result ? "default" : "outline"}
                  size="sm"
                  className={`${
                    selectedResult === result 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedResult(result)}
                >
                  {result}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interview Experiences */}
      <div className="space-y-6">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-all duration-300"
          >
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
              
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exp.difficulty)}`}>
                  {exp.difficulty}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(exp.result)}`}>
                  {exp.result}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{exp.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(exp.date).toLocaleDateString()}</span>
              </div>
              <span>{exp.rounds} rounds</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                <span>{exp.rating}/5</span>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{exp.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">by {exp.author}</span>
                <div className="flex items-center text-gray-400">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{exp.likes}</span>
                </div>
              </div>
              
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                Read Full Experience
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewExp;