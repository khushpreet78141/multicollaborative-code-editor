import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Users, PlayCircle, Rocket } from "lucide-react";


const steps = [
  {
    id: "01",
    title: "Create Room",
    description: "Start a new coding session instantly",
    icon: Rocket,
  },
  {
    id: "02",
    title: "Invite",
    description: "Share invite code with your team",
    icon: Users,
  },
  {
    id: "03",
    title: "Collaborate",
    description: "Code together in real-time",
    icon: Code,
  },
  {
    id: "04",
    title: "Run Code",
    description: "Execute & see output instantly",
    icon: PlayCircle,
  },
];

const HowItWorks = () => {
  const ref = useRef(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Line fill animation
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="howItWorks" className="bg-black text-white py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-400 mb-20"
        >

        Start collaborating in seconds with a seamless workflow
        </motion.p>

        {/* Stepper */}
        <div className="hidden md:flex items-center justify-between relative">

          {/* Background line */}
          <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-800"></div>

          {/* Animated gradient line */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-6 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            // Step activation logic
            const stepProgress = useTransform(
              scrollYProgress,
              [
                index / steps.length,
                (index + 1) / steps.length,
              ],
              [0, 1]
            );

            const scale = useTransform(stepProgress, [0, 1], [1, 1.2]);
            const opacity = useTransform(stepProgress, [0, 1], [0.5, 1]);

            return (
              <motion.div
                key={index}
                style={{ opacity }}
                className="relative flex flex-col items-center w-full"
              >

                {/* Circle */}
                <motion.div
                  style={{ scale }}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900 border border-gray-700 z-10"
                >
                  <Icon size={22} className="text-purple-400" />
                </motion.div>

                {/* Glow effect */}
                <motion.div
                  style={{ opacity }}
                  className="absolute w-14 h-14 rounded-full bg-purple-500 blur-xl opacity-20"
                />

                {/* Title */}
                <h3 className="mt-6 text-lg font-semibold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mt-2 text-center max-w-[160px]">
                  {step.description}
                </p>

                {/* Step number */}
                <span className="absolute -top-6 text-xs text-gray-500">
                  {step.id}
                </span>

              </motion.div>
            );
          })}
        </div>

        {/* Mobile (animated vertical) */}
        <div className="md:hidden flex flex-col gap-12 relative">

          <motion.div
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
            className="absolute left-5 top-0 w-[2px] bg-gradient-to-b from-purple-500 to-blue-500"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4"
              >

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-gray-700 z-10">
                  <Icon size={18} className="text-purple-400" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;