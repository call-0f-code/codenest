import { cn } from "@/lib/utils";
import {
  IconCode,
  IconBrain,
  IconTarget,
  IconTrophy,
  IconUsers,
  IconBook,
  IconChartBar,
  IconRocket,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Topic-wise Questions",
      description:
        "Organized collection of questions categorized by data structures like arrays, trees, graphs, and more.",
      icon: <IconCode />,
    },
    {
      title: "Progressive Learning",
      description:
        "Start from basics and gradually move to advanced concepts with our structured learning path.",
      icon: <IconBrain />,
    },
    {
      title: "Interview Prep",
      description:
        "Curated questions from top tech companies to prepare you for coding interviews.",
      icon: <IconTarget />,
    },
    {
      title: "Interactive Practice",
      description: "Hands-on coding environment with instant feedback and solution explanations.",
      icon: <IconRocket />,
    },
    {
      title: "Community Support",
      description:
        "Join a community of learners, discuss solutions, and get help from peers.",
      icon: <IconUsers />,
    },
    {
      title: "Detailed Solutions",
      description:
        "Step-by-step solutions with multiple approaches and complexity analysis.",
      icon: <IconBook />,
    },
    {
      title: "Progress Tracking",
      description:
        "Track your learning progress with detailed analytics and achievement badges.",
      icon: <IconChartBar />,
    },
    {
      title: "Multiple Platform Questions",
      description: "Practice coding from your favourite platforms - Leetcode, GeeksForGeeks , Codechef ",
      icon: <IconTrophy />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 dark:from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 dark:from-neutral-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white dark:text-black">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 dark:bg-neutral- group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white dark:text-black">
          {title}
        </span>
      </div>
      <p className="text-sm text-white dark:text-black max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};