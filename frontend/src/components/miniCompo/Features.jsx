import { Users, Zap, Trophy } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "COMMUNITY",
      desc: "Connect with passionate coders and grow together.",
      icon: <Users className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#2C1810] dark:text-[#2C1810]" />,
      bg: "bg-[#F5E6D3] dark:bg-[#2C1810]",
    },
    {
      title: "INNOVATION",
      desc: "Explore cutting-edge technologies and build amazing things.",
      icon: <Zap className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#2C1810] dark:text-[#2C1810]" />,
      bg: "bg-[#F5E6D3] dark:bg-[#2C1810]",
    },
    {
      title: "ACHIEVEMENT",
      desc: "Participate in hackathons and showcase your skills.",
      icon: <Trophy className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#2C1810] dark:text-[#2C1810]" />,
      bg: "bg-[#F5E6D3] dark:bg-[#2C1810]",
    },
  ];

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-4 inline-block border-b-4 sm:border-b-6 md:border-b-8 border-[#C1502E] dark:border-[#F5E6D3] pb-2">
            WHY JOIN US?
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.bg} border-4 border-black dark:border-[#F5E6D3] p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] sm:shadow-[8px_8px_0px_0px_rgba(193,80,46,1)] hover:-translate-y-2 transition-all`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#C1502E] dark:bg-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                {f.icon}
              </div>

              <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2 sm:mb-3">
                {f.title}
              </h4>

              <p className="text-sm sm:text-base md:text-lg font-bold text-[#2C1810]/80 dark:text-[#F5E6D3]/80">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
