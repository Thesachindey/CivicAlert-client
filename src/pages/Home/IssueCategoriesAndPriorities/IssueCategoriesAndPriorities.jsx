import React from "react";
import { motion } from "framer-motion";
import {
  FaRoad,
  FaWater,
  FaLightbulb,
  FaTrash,
  FaExclamationTriangle,
  FaEllipsisH,
} from "react-icons/fa";

const issues = [
  {
    icon: FaRoad,
    title: "Road Damage",
    desc: "Report potholes, broken roads, and unsafe footpaths affecting daily travel.",
  },
  {
    icon: FaWater,
    title: "Water Leakage",
    desc: "Identify leaking pipes, drainage failures, and water supply problems.",
  },
  {
    icon: FaLightbulb,
    title: "Street Lighting",
    desc: "Report non-functional street lights that reduce safety at night.",
  },
  {
    icon: FaTrash,
    title: "Waste Management",
    desc: "Garbage overflow, missed collections, and sanitation issues.",
  },
  {
    icon: FaExclamationTriangle,
    title: "Public Safety",
    desc: "Open manholes, fallen trees, or hazards threatening public safety.",
  },
  {
    icon: FaEllipsisH,
    title: "Others",
    desc: "Any public issue that does not fall into existing categories but still requires attention.",
  },
];

export default function IssueFeaturesSection() {
  // 1. Unified Spring Variants (Matching your Banner)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 40, damping: 20 },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Issues citizens can report using <br />
            <span className="text-[#08cb00] drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">CivicAlert</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Easily report public infrastructure problems and help authorities
            take faster, data-driven action to improve your community.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {issues.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                    y: -10, 
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(8, 203, 0, 0.4)"
                }}
                className="
                  group relative flex flex-col overflow-hidden
                  /* ULTRA GLASS EFFECT */
                  bg-white/[0.03] backdrop-blur-[40px] 
                  border border-white/10 border-t-white/20
                  shadow-[0_20px_40px_rgba(0,0,0,0.2)] 
                  rounded-[2.5rem] transition-all duration-500
                "
              >
                {/* Image Area with Neon Glow */}
                <div className="h-44 flex items-center justify-center relative bg-[#08cb00]/5 border-b border-white/5 overflow-hidden">
                  {/* Internal ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#08cb00]/10 to-transparent opacity-50" />
                  
                  <div className="
                    h-20 w-20 rounded-2xl bg-white/5 backdrop-blur-md 
                    flex items-center justify-center text-[#08cb00]
                    border border-white/10 shadow-[0_0_20px_rgba(8,203,0,0.2)]
                    group-hover:shadow-[0_0_40px_rgba(8,203,0,0.5)]
                    group-hover:scale-110 transition-all duration-500 z-10
                  ">
                    <Icon className="text-4xl drop-shadow-[0_0_10px_rgba(8,203,0,0.5)]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#08cb00] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle Hover Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}