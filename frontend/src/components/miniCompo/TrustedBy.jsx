const TrustedBy = () => {
  const companies = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Uber", "Spotify"
  ];

  return (
    <section className="py-16 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-lg mb-8">
            Trusted by students who got placed at top companies
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={company}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300 font-semibold text-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Student Success Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-gray-300 font-medium mb-1">Success Rate</div>
            <div className="text-gray-500 text-sm">Students clearing interviews</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">4.8/5</div>
            <div className="text-gray-300 font-medium mb-1">Student Rating</div>
            <div className="text-gray-500 text-sm">Average platform rating</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">2x</div>
            <div className="text-gray-300 font-medium mb-1">Faster Learning</div>
            <div className="text-gray-500 text-sm">Compared to traditional methods</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
