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
    <div key={platform.key}>
      <label className="font-orbitron text-xs font-bold tracking-wider text-black dark:text-white block mb-2 flex items-center gap-2">
        <platform.icon className="h-4 w-4 text-[#3dd68c]" />
        {platform.label.toUpperCase()}
      </label>
      {isEditing ? (
        <input
          type="url"
          value={user[platform.key] || ""}
          onChange={(e) => onChange(platform.key, e.target.value)}
          placeholder={platform.placeholder}
          className="h-10 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] px-3 font-orbitron text-sm text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
        />
      ) : (
        <p className="text-[#5f6b72] dark:text-[#8b96a5]">
          {user[platform.key] ? (
            <a href={user[platform.key]} target="_blank" rel="noopener noreferrer" className="hover:text-[#3dd68c] transition-colors">
              {user[platform.key]}
            </a>
          ) : (
            "Not set"
          )}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6">
        <h2 className="font-orbitron text-xl font-bold text-[#1a1f2e] dark:text-white mb-6">
          SOCIAL LINKS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map(renderPlatformInput)}
        </div>
      </div>

      <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6">
        <h2 className="font-orbitron text-xl font-bold text-[#1a1f2e] dark:text-white mb-6">
          CODING PLATFORMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {codingPlatforms.map(renderPlatformInput)}
        </div>
      </div>
    </div>
  );
};
