import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border border-blue-500 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-10 w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, even the best developers hit dead ends sometimes!
          </p>
        </div>

        {/* Searched Route Info */}
        <div className="mb-8 p-4 bg-slate-900/50 border border-slate-800/50 rounded-xl max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-slate-300">
            <Search className="w-4 h-4" />
            <span className="text-sm font-mono">
              {location.pathname}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </Button>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute top-32 right-10 text-purple-400 font-mono text-sm opacity-20 animate-pulse hidden lg:block">
          {'if (page.exists()) {'}
          <br />
          {'  return <Page />;'}
          <br />
          {'} else {'}
          <br />
          {'  return <NotFound />;'}
          <br />
          {'}'}
        </div>
        <div className="absolute bottom-32 left-10 text-blue-400 font-mono text-sm opacity-20 animate-pulse hidden lg:block">
          {'console.error("404: Route not found");'}
        </div>
      </div>
    </div>
  );
};

export default NotFound;