import React from "react";

import { Code2, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: <Code2 size={28} />,
    title: "Real-time Code Editor",
    desc: "Write and execute code instantly with seamless live collaboration.",
  },
  {
    icon: <Users size={28} />,
    title: "Collaborative Rooms",
    desc: "Invite friends and code together in real-time like Google Docs.",
  },
  {
    icon: <Zap size={28} />,
    title: "Fast Execution",
    desc: "Run code instantly with minimal latency and optimized backend.",
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Environment",
    desc: "Your code and sessions are protected with modern security practices.",
  },
];

const Feature = () => {
  return (
   <section id="features" className="relative bg-[#050505] text-white py-24 px-6 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] -translate-x-1/2"></div>

  {/* Heading */}
  <div className="text-center mb-20 relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
      Built for Modern Developers
    </h2>
    
    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
      Experience lightning-fast collaboration with a beautifully designed coding environment.
    </p>
  </div>

  {/* Grid */}
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto relative z-10">

    {features.map((feature, index) => (
      <div
        key={index}
        className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent
                   transform-gpu transition-all duration-300 ease-out
                   hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)]"
      >
        
        {/* Card */}
        <div className="relative h-full bg-[#0a0a0a] rounded-2xl p-6 overflow-hidden">

          {/* Smooth Glow Layer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10"></div>
          </div>

          {/* Icon */}
          <div className="text-purple-400 mb-4 transition-transform duration-300 group-hover:scale-110">
            {feature.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {feature.desc}
          </p>

        </div>
      </div>
    ))}

  </div>
</section>
  );
};

export default Feature;
