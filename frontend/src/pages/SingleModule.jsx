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

  // ✅ Fetch module and progress data
 useEffect(() => {
  const fetchModuleAndProgress = async () => {
    try {
      setLoading(true);

      const [moduleRes, progressRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/getModule/${id}`, {
          withCredentials: true,
        }),
        
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/progress/${id}`, {
          withCredentials: true,
        }),
      ]);

      console.log("Module API Response:", moduleRes.data);

      const moduleData = moduleRes.data?.data;
      const moduleSuccess = moduleRes.data?.success;

      if (!moduleSuccess || !moduleData) {
        console.error("Invalid module response");
        setModule(null);
        return;
      }

      const progressData = progressRes.data?.completedQuestions || [];
      setModule(moduleData);
      setCompletedQuestions(new Set(progressData));
    } catch (error) {
      console.error("Failed to load module or progress:", error);
      setModule(null);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchModuleAndProgress();
}, [id]);

  // ✅ Save progress when toggled
  const toggleQuestionCompletion = async (questionIndex) => {
    const newCompleted = new Set(completedQuestions);

    if (newCompleted.has(questionIndex)) {
      newCompleted.delete(questionIndex);
    } else {
      newCompleted.add(questionIndex);
    }

    setCompletedQuestions(newCompleted);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/progress/${id}`,
        { completedQuestions: Array.from(newCompleted) },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to save progress", err);
    }
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
        <div className="max-w-6xl mx-auto">Loading...</div>
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
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white mb-6">Questions</h2>

          {module.questions && module.questions.length > 0 ? (
            module.questions.map((question, index) => (
              <Card
                key={index}
                className={`bg-gray-800 border-gray-700 transition-all duration-300 ${
                  completedQuestions.has(index)
                    ? "ring-1 ring-green-500 bg-gray-800/50"
                    : "hover:border-purple-500"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <Checkbox
                      id={`question-${index}`}
                      checked={completedQuestions.has(index)}
                      onCheckedChange={() => toggleQuestionCompletion(index)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex-shrink-0"
                    />

                    {/* Question Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-medium transition-colors truncate ${
                          completedQuestions.has(index)
                            ? "text-green-400 line-through"
                            : "text-white"
                        }`}
                        title={question.questionName}
                      >
                        {question.questionName}
                      </h3>
                    </div>

                    {/* Status and Difficulty */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        {completedQuestions.has(index) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                        <span
                          className={`text-xs hidden sm:inline ${
                            completedQuestions.has(index)
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          {completedQuestions.has(index)
                            ? "Done"
                            : "Todo"}
                        </span>
                      </div>

                      <Badge
                        className={`text-xs px-2 py-1 ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {question.difficulty}
                      </Badge>

                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 h-8 text-xs"
                        onClick={() => window.open(question.link, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Solve</span>
                      </Button>
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