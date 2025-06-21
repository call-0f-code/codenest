
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  const benefits = [
    "Access to 500+ curated questions",
    "Step-by-step video solutions",
    "Progress tracking & analytics",
    "Interview preparation guidance",
    "Community support & discussions"
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master
                <br />
                <span className="text-purple-400">Data Structures?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of students who have already started their journey 
                to coding excellence. Get started today and see the difference.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                    Start Learning Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-4">
                  View Sample Questions
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-6">
              <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600">
                <div className="text-3xl font-bold text-purple-400 mb-2">Free Forever</div>
                <div className="text-gray-300 mb-4">Core features available at no cost</div>
                <div className="text-sm text-gray-400">
                  Access basic questions, solutions, and community features
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600">
                <div className="text-3xl font-bold text-blue-400 mb-2">Premium $9/mo</div>
                <div className="text-gray-300 mb-4">Advanced features for serious learners</div>
                <div className="text-sm text-gray-400">
                  Video explanations, interview prep, and priority support
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
                <div className="text-lg font-semibold text-green-400 mb-2">
                  🎉 Limited Time Offer
                </div>
                <div className="text-gray-300 text-sm">
                  Get 3 months of Premium for free when you sign up this week!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;