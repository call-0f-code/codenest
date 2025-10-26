import { Users, Zap, Trophy } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "COMMUNITY",
      desc: "Connect with passionate coders and grow together.",
      icon: <Users className="h-10 w-10 text-[#C1502E] dark:text-[#F5E6D3]" />,
      bg: "bg-[#F5E6D3] dark:bg-[#2C1810]",
    },
    {
      title: "INNOVATION",
      desc: "Explore cutting-edge technologies and build amazing things.",
      icon: <Zap className="h-10 w-10 text-[#C1502E] dark:text-[#F5E6D3]" />,
      bg: "bg-[#C1502E] dark:bg-[#1A0D08]",
    },
    {
      title: "ACHIEVEMENT",
      desc: "Participate in hackathons and showcase your skills.",
      icon: <Trophy className="h-10 w-10 text-[#C1502E] dark:text-[#F5E6D3]" />,
      bg: "bg-[#F5E6D3] dark:bg-[#2C1810]",
    },
  ];

  return (
    <section className="px-6 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h3 className="text-6xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-4 inline-block border-b-8 border-[#C1502E] dark:border-[#F5E6D3] pb-2">
            WHY JOIN US?
          </h3>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.bg} border-4 border-black dark:border-[#F5E6D3] p-8 shadow-[8px_8px_0px_0px_rgba(193,80,46,1)] hover:-translate-y-2 transition-all`}
            >
              <div className="w-20 h-20 bg-[#C1502E] dark:bg-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h4 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-3">
                {f.title}
              </h4>
              <p className="text-lg font-bold text-[#2C1810]/80 dark:text-[#F5E6D3]/80">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
