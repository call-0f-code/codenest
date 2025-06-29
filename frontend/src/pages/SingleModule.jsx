import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const SingleModule = () => {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  // useEffect(() => {
  //   const fetchModule = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/v1/getModule/${id}`, {
  //         withCredentials: true,
  //       });

  //       console.log(response.data.data);

  //       if (response.data.success) {
  //         setModule(response.data.data);
  //         console.log("Module state :" , response.data.data)
  //       }
  //     } catch (error) {
  //       console.error("Failed to load module:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchModule();
  //   }
  // }, [id]);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/getModule/${id}`,
          {
            withCredentials: true,
          }
        );
 // Then log the data property

        // Check if response.data exists and has the expected structure
        if (response.data) {
          // Try different possible response structures
          const moduleData = response.data.data || response.data;


          if (moduleData) {
            setModule(moduleData);
          } else {
            console.error("No module data found in response");
          }
        }
      } catch (error) {
        console.error("Failed to load module:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchModule();
    }
  }, [id]);

  const toggleQuestionCompletion = (questionIndex) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionIndex)) {
      newCompleted.delete(questionIndex);
    } else {
      newCompleted.add(questionIndex);
    }
    setCompletedQuestions(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600 text-green-100";
      case "Medium":
        return "bg-yellow-600 text-yellow-100";
      case "Hard":
        return "bg-red-600 text-red-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  const completedCount = completedQuestions.size;
  const totalQuestions = module?.questions?.length || 0;
  const progressPercentage =
    totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Module Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The module you're looking for doesn't exist.
          </p>
          <Link to="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </Button>
          </Link>
        </div>

        {/* Module Info */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white mb-4">
              {module.title}
            </CardTitle>
            <p className="text-gray-400 text-lg leading-relaxed">
              {module.description}
            </p>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Progress
                </span>
                <span className="text-sm text-gray-300">
                  {completedCount} / {totalQuestions} completed
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>{totalQuestions} Questions</span>
              {module.createdBy && <span>Created by {module.createdBy}</span>}
              <span>
                Created {new Date(module.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Questions</h2>

          {module.questions && module.questions.length > 0 ? (
            module.questions.map((question, index) => (
              <Card
                key={index}
                className={`bg-gray-800 border-gray-700 transition-all duration-300 ${
                  completedQuestions.has(index)
                    ? "ring-2 ring-green-500 bg-gray-800/50"
                    : "hover:border-purple-500"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className="mt-1">
                      <Checkbox
                        id={`question-${index}`}
                        checked={completedQuestions.has(index)}
                        onCheckedChange={() => toggleQuestionCompletion(index)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className={`text-lg font-semibold transition-colors ${
                            completedQuestions.has(index)
                              ? "text-green-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {question.questionName}
                        </h3>
                        <Badge
                          className={`ml-4 ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {completedQuestions.has(index) ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                          <span
                            className={`text-sm ${
                              completedQuestions.has(index)
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {completedQuestions.has(index)
                              ? "Completed"
                              : "Not Started"}
                          </span>
                        </div>

                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => window.open(question.link, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Solve Problem
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">
                  No questions available in this module yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleModule;
