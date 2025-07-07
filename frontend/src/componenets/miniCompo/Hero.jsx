import { ArrowRight, Play , LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-blue-500 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-8">
            <span className="text-purple-300 text-sm font-medium">
              🚀 Master Data Structures & Algorithms
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Code Your Way to
            <br />
            <span className="text-purple-400">Success</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master data structures and algorithms with our comprehensive collection of 
            topic-wise questions. Practice, learn, and excel in your coding interviews.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                Go to Dashboard
                <LayoutDashboard className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-400">Practice Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-gray-400">Data Structure Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">10k+</div>
              <div className="text-gray-400">Students Learning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute top-32 right-10 text-purple-400 font-mono text-sm opacity-20 animate-pulse hidden lg:block">
        {'function solve(arr) {'}
        <br />
        {'  return arr.sort();'}
        <br />
        {'}'}
      </div>
      <div className="absolute bottom-32 left-10 text-blue-400 font-mono text-sm opacity-20 animate-pulse hidden lg:block">
        {'console.log("Ready to code!");'}
      </div>
    </section>
  );
};

export default Hero;