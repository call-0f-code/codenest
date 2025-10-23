import { Terminal, Shield, Zap, Users } from "lucide-react";

const BrandingSection = () => {
  return (
    <div className="relative">
      {/* Background shadow box */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2a2d35] dark:bg-[#0f1419]"
      />

      {/* Main box */}
      <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-8 md:p-10">
        {/* Header icon + line */}
        <div className="mb-6 flex items-center gap-3 text-[#3dd68c]">
          <Terminal className="h-8 w-8" />
          <div className="h-1 w-12 bg-[#3dd68c]" />
        </div>

        {/* Title and subtitle */}
        <h1 className="mb-3  text-3xl font-bold text-[#1a1f2e] dark:text-white md:text-4xl">
          Access the Arena
        </h1>
        <p className="mb-8  text-sm text-[#5f6b72] dark:text-[#8b96a5]">
          Authenticate and engage
        </p>

        {/* SVG illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <rect
                x="40"
                y="70"
                width="80"
                height="70"
                className="fill-[#3dd68c] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
              <rect
                x="50"
                y="30"
                width="60"
                height="50"
                className="fill-[#3dd68c] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
              <line
                x1="80"
                y1="30"
                x2="80"
                y2="15"
                className="stroke-[#2a2d35] dark:stroke-[#c5d1de]"
                strokeWidth="3"
              />
              <circle
                cx="80"
                cy="12"
                r="5"
                className="fill-[#2a2d35] dark:fill-[#c5d1de]"
              />
              <rect
                x="60"
                y="45"
                width="12"
                height="12"
                className="fill-[#2a2d35] dark:fill-[#1a1f2e]"
              />
              <rect
                x="88"
                y="45"
                width="12"
                height="12"
                className="fill-[#2a2d35] dark:fill-[#1a1f2e]"
              />
              <rect x="63" y="48" width="6" height="6" className="fill-[#3dd68c]" />
              <rect x="91" y="48" width="6" height="6" className="fill-[#3dd68c]" />
              <line
                x1="65"
                y1="65"
                x2="95"
                y2="65"
                className="stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
              <rect
                x="20"
                y="80"
                width="20"
                height="40"
                className="fill-[#3dd68c] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
              <rect
                x="120"
                y="80"
                width="20"
                height="40"
                className="fill-[#3dd68c] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
              <rect
                x="60"
                y="85"
                width="40"
                height="35"
                className="fill-white dark:fill-[#1f2937] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="2"
              />
              <text
                x="80"
                y="108"
                className="fill-[#3dd68c]"
                fontSize="20"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                &lt;/&gt;
              </text>
              <rect
                x="55"
                y="140"
                width="20"
                height="15"
                className="fill-[#3dd68c] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
              <rect
                x="85"
                y="140"
                width="20"
                height="15"
                className="fill-[#3dd68c] stroke-[#2a2d35] dark:stroke-[#1a1f2e]"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="mt-1 h-5 w-5 flex-shrink-0 text-[#3dd68c]" />
            <p className=" text-sm font-semibold text-[#2a2d35] dark:text-[#c5d1de]">
              Secure sessions
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="mt-1 h-5 w-5 flex-shrink-0 text-[#3dd68c]" />
            <p className=" text-sm font-semibold text-[#2a2d35] dark:text-[#c5d1de]">
              Weekly challenges
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-1 h-5 w-5 flex-shrink-0 text-[#3dd68c]" />
            <p className=" text-sm font-semibold text-[#2a2d35] dark:text-[#c5d1de]">
              Project collabs
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 h-1 w-24 bg-[#3dd68c]" />
      </div>
    </div>
  );
};

export default BrandingSection;
