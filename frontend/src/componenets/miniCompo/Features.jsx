import { Code } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "./feature-section-with-hover-effects";

const Features = () => {
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

        {/* New Features Grid with Hover Effects */}
        <FeaturesSectionWithHoverEffects />

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