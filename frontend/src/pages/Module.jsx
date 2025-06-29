import { useEffect, useState } from "react";
import { Book, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";


const modulesContent = [
  {
    id: 1,
    title: "Arrays & Strings",
    description:
      "Master fundamental data structures with arrays and string manipulation techniques",
    topics: 45,
    difficulty: "Beginner",
    estimatedTime: "2-3 weeks",
    enrolled: 1250,
    rating: 4.8,
    progress: 0,
  },
  {
    id: 2,
    title: "Linked Lists",
    description:
      "Deep dive into linked list operations, traversal, and advanced techniques",
    topics: 38,
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
    enrolled: 980,
    rating: 4.7,
    progress: 0,
  },
  {
    id: 3,
    title: "Trees & Graphs",
    description:
      "Explore tree traversals, graph algorithms, and complex data relationships",
    topics: 52,
    difficulty: "Advanced",
    estimatedTime: "3-4 weeks",
    enrolled: 750,
    rating: 4.9,
    progress: 0,
  },
  {
    id: 4,
    title: "Dynamic Programming",
    description:
      "Master optimization techniques and solve complex algorithmic problems",
    topics: 35,
    difficulty: "Advanced",
    estimatedTime: "3 weeks",
    enrolled: 650,
    rating: 4.6,
    progress: 0,
  },
  {
    id: 5,
    title: "Sorting & Searching",
    description:
      "Learn various sorting algorithms and efficient searching techniques",
    topics: 28,
    difficulty: "Intermediate",
    estimatedTime: "1-2 weeks",
    enrolled: 1100,
    rating: 4.5,
    progress: 0,
  },
  {
    id: 6,
    title: "System Design Basics",
    description:
      "Introduction to system design concepts and scalability patterns",
    topics: 20,
    difficulty: "Advanced",
    estimatedTime: "2 weeks",
    enrolled: 500,
    rating: 4.8,
    progress: 0,
  },
];

const Module = () => {
  console.log("ViewModules rendered");

  const [modules, setModules] = useState([]);

  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredModules =
    selectedDifficulty === "All"
      ? modulesContent
      : modulesContent.filter(
          (module) => module.difficulty === selectedDifficulty
        );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600 text-green-100";
      case "Intermediate":
        return "bg-yellow-600 text-yellow-100";
      case "Advanced":
        return "bg-red-600 text-red-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/getModules", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          setModules(res.data.data);
          console.log("Data from server", res.data.data);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learning Modules</h1>
        <p className="text-gray-400">
          Choose a module to start your DSA journey
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8">
        {difficulties.map((difficulty) => (
          <Button
            key={difficulty}
            variant={selectedDifficulty === difficulty ? "default" : "outline"}
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

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module._id}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {module.title}
              </h3>
              {/* <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                  module.difficulty
                )}`}
              >
                {module.difficulty}
              </span> */}
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {module.description}
            </p>

            <div className="space-y-3 mb-6">
              {/* <div className="flex items-center text-gray-300 text-sm">
                <Book className="w-4 h-4 mr-2" />
                <span>{module.topics} Topics</span>
              </div> */}
              <div className="flex items-center text-gray-300 text-sm">
                {/* <Clock className="w-4 h-4 mr-2" />
                <span>{module.estimatedTime}</span> */}
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span>{module.createdBy} </span>
              </div>
              {/* <div className="flex items-center text-gray-300 text-sm">
                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                <span>{module.rating}/5</span>
              </div> */}
            </div>

            <Link to={`/dashboard/modules/${module._id}`}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Start Learning
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module;

// import React from "react";

// const Module = () => {
//     console.log("Module Rendered");
//   return <h1 className="text-white p-6 text-2xl">Hi from ViewModules , My name is Vansh</h1>;
// };

// export default Module;
