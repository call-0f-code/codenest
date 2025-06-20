import { Code, Database, GitBranch, Zap } from "lucide-react";

const BrandingSection = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-10 w-8 h-8 bg-white rounded-full animate-pulse"></div>
      </div>

      <div className="text-center text-white z-10 max-w-md px-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm mb-4">
            <Code className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            code<span className="text-purple-300">Nest</span>
          </h1>
          <p className="text-purple-200 text-lg">Master Data Structures & Algorithms</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-black bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Topic-wise Questions</h3>
              <p className="text-sm text-purple-200">Organized by data structures</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-black bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Progressive Learning</h3>
              <p className="text-sm text-purple-200">From basics to advanced</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-black bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Interactive Practice</h3>
              <p className="text-sm text-purple-200">Hands-on coding experience</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-black bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-xs text-purple-200">Questions</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">15+</div>
            <div className="text-xs text-purple-200">Topics</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-xs text-purple-200">Access</div>
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute top-20 right-10 text-purple-300 font-mono text-sm opacity-30 animate-pulse">
        {'{ "learning": true }'}
      </div>
      <div className="absolute bottom-32 left-5 text-purple-300 font-mono text-sm opacity-30 animate-pulse">
        {'console.log("success");'}
      </div>
    </div>
  );
};

export default BrandingSection;