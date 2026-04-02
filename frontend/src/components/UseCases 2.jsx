import React, { useState } from "react";
import { Code2, Users, GraduationCap, Briefcase } from "lucide-react";

const useCases = [
  {
    title: "Developers",
    description: "Pair program and debug code together in real-time.",
    icon: Code2,
    preview: "👨‍💻 Real-time coding session with synced editors",
  },
  {
    title: "Students",
    description: "Practice DSA and coding problems collaboratively.",
    icon: GraduationCap,
    preview: "🎓 Solve problems together during study sessions",
  },
  {
    title: "Teams",
    description: "Collaborate on projects and review code instantly.",
    icon: Users,
    preview: "👥 Team-based coding with live updates",
  },
  {
    title: "Educators",
    description: "Teach coding with live demonstrations and interaction.",
    icon: Briefcase,
    preview: "🏫 Live teaching with shared coding environment",
  },
];

const UseCases = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="useCases" className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Every Kind of Coder
          </h2>
          <p className="text-gray-400">
            Whether you're learning, building, or teaching — we've got you covered.
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT: Use Case List */}
          <div className="flex flex-col gap-6">
            {useCases.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300
                    ${isActive ? "bg-zinc-900 border border-purple-500" : "hover:bg-zinc-900"}
                  `}
                >
                  <Icon
                    className={`mt-1 ${
                      isActive ? "text-purple-400" : "text-gray-500"
                    }`}
                  />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-[1px] rounded-2xl">
              
              <div className="bg-zinc-900 rounded-2xl p-8 h-[250px] flex items-center justify-center text-center">
                
                <p className="text-lg text-gray-300">
                  {useCases[activeIndex].preview}
                </p>

              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 blur-2xl opacity-20 bg-purple-500 rounded-2xl -z-10"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default UseCases;