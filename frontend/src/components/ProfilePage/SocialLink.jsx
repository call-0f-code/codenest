import { Award, Code2, Github, Linkedin, Twitter } from "lucide-react";

export const SocialLinks = ({ user, isEditing, onChange }) => {
  const platforms = [
    { key: "github", icon: Github, label: "GitHub", placeholder: "github.com/username" },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", placeholder: "linkedin.com/in/username" },
    { key: "twitter", icon: Twitter, label: "Twitter", placeholder: "twitter.com/username" },
  ];

  const codingPlatforms = [
    { key: "leetcode", icon: Code2, label: "LeetCode", placeholder: "leetcode.com/username" },
    { key: "geeksforgeeks", icon: Code2, label: "GeeksforGeeks", placeholder: "geeksforgeeks.org/user/username" },
    { key: "codechef", icon: Award, label: "CodeChef", placeholder: "codechef.com/users/username" },
    { key: "codeforces", icon: Code2, label: "Codeforces", placeholder: "codeforces.com/profile/username" },
  ];

  const renderPlatformInput = (platform) => (
    <div key={platform.key} className="space-y-1">
      <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3] flex items-center gap-2">
        <platform.icon className="h-4 w-4 text-[#C1502E]" />
        {platform.label.toUpperCase()}
      </label>
      {isEditing ? (
        <input
          type="url"
          value={user[platform.key] || ""}
          onChange={(e) => onChange(platform.key, e.target.value)}
          placeholder={platform.placeholder}
          className="h-10 w-full border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] px-3 font-semibold placeholder:text-[#C1502E]/60 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] focus:outline-none focus:ring-4 focus:ring-[#C1502E]"
        />
      ) : (
        <p className="text-[#2C1810]/70 dark:text-[#F5E6D3]/70 text-sm font-medium">
          {user[platform.key] ? (
            <a
              href={user[platform.key]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C1502E] underline decoration-[3px] decoration-[#C1502E] underline-offset-2 transition-all font-semibold"
            >
              {user[platform.key]}
            </a>
          ) : (
            <span className="italic text-[#C1502E]/70">Not set</span>
          )}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Social Links Section */}
      <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_rgba(245,230,211,0.3)] p-8">
        {/* Brutalist Tag */}
        <div className="absolute -top-4 left-4 bg-[#2C1810] text-[#F5E6D3] text-xs font-black px-3 py-1 border-4 border-black dark:border-[#F5E6D3] rotate-[-3deg] shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.3)]">
          SOCIAL LINKS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {platforms.map(renderPlatformInput)}
        </div>

        {/* Small decorative brutalist shape */}
        <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] rotate-[8deg] opacity-50 shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.2)]"></div>
      </div>

      {/* Coding Platforms Section */}
      <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_rgba(245,230,211,0.3)] p-8">
        {/* Brutalist Tag */}
        <div className="absolute -top-4 left-4 bg-[#C1502E] text-[#F5E6D3] text-xs font-black px-3 py-1 border-4 border-black dark:border-[#F5E6D3] rotate-[2deg] shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.3)]">
          CODING PLATFORMS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {codingPlatforms.map(renderPlatformInput)}
        </div>

        {/* Smaller shape for visual rhythm */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] rotate-[-5deg] opacity-50 shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.2)]"></div>
      </div>
    </div>
  );
};