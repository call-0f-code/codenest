import { Code, Database, GitBranch, Zap, Target, BookOpen, Award, Users } from "lucide-react";
import { Card , CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Database,
      title: "Topic-wise Questions",
      description: "Organized collection of questions categorized by data structures like arrays, trees, graphs, and more.",
      color: "text-purple-400"
    },
    {
      icon: GitBranch,
      title: "Progressive Learning",
      description: "Start from basics and gradually move to advanced concepts with our structured learning path.",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Interactive Practice",
      description: "Hands-on coding environment with instant feedback and solution explanations.",
      color: "text-green-400"
    },
    {
      icon: Target,
      title: "Interview Prep",
      description: "Curated questions from top tech companies to prepare you for coding interviews.",
      color: "text-orange-400"
    },
    {
      icon: BookOpen,
      title: "Detailed Solutions",
      description: "Step-by-step solutions with multiple approaches and complexity analysis.",
      color: "text-pink-400"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Track your learning progress with detailed analytics and achievement badges.",
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of learners, discuss solutions, and get help from peers.",
      color: "text-indigo-400"
    },
    {
      icon: Code,
      title: "Multiple Languages",
      description: "Practice coding in your preferred language - Python, Java, C++, JavaScript, and more.",
      color: "text-red-400"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive tools and resources designed to help you master data structures 
            and algorithms efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Real-time Code Execution
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Test your solutions instantly with our integrated code editor. 
              Get immediate feedback and see your code run against multiple test cases.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <Code className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-300 font-medium">Try it now - No setup required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;