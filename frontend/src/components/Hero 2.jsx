import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
const Hero = () => {

  const navigate = useNavigate();
    const goDashboard = async () => {
    try{
       const user = await axiosClient.get('auth/getUser');
      console.log(user);
       navigate('/dashboard');
    }catch(err){
       console.log(err);
      navigate('/login');
    }
 
  }
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-between px-6 md:px-16 bg-[#020617] text-white overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-[-100px] left-1/2 w-[700px] h-[700px] bg-indigo-600 opacity-20 blur-3xl rounded-full -translate-x-1/2"></div>

      {/* Optional grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(to right, #1f2937 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* LEFT CONTENT */}
      <div className="z-10 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Code Together. <br /> Build Faster.
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          A real-time collaborative code editor where developers can write,
          edit, and execute code together seamlessly.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button onClick={goDashboard} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium shadow-lg transition duration-300">
            Get Started
          </button>

          <button className="px-6 py-3 border border-gray-700 hover:border-indigo-500 rounded-xl text-gray-300 hover:text-white transition duration-300">
            Live Demo
          </button>
        </div>

        {/* TRUST / SMALL TEXT */}
        <p className="mt-6 text-sm text-gray-500">
          No setup required • Instant collaboration • Secure sessions
        </p>
      </div>

      {/* RIGHT SIDE - CODE UI */}
      <div className="z-10 hidden md:block">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-[420px]">

          {/* Fake Editor Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Code */}
          <pre className="text-sm text-green-400 leading-relaxed">
{`// Collaborative Editor 
function startSession(users) {
  users.forEach(user => {
    connect(user);
  });
  console.log("Live editing started");
}

startSession(["You", "Team"]);`}
          </pre>
        </div>
      </div>

    </section>
    </div>
  )
}

export default Hero
