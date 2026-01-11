import React from "react";
import { FaCheckCircle, FaClock, FaUsers, FaBullhorn } from "react-icons/fa";
import { motion } from "framer-motion";

const impactData = [
  {
    icon: <FaBullhorn />,
    value: "12,450+",
    label: "Issues Reported",
  },
  {
    icon: <FaCheckCircle />,
    value: "9,820+",
    label: "Issues Resolved",
  },
  {
    icon: <FaClock />,
    value: "3.2 Days",
    label: "Avg Resolution",
  },
  {
    icon: <FaUsers />,
    value: "4,300+",
    label: "Active Citizens",
  },
];

const CommunityImpact = () => {
  // 1. Unified Spring Variants (Matching Banner & Features)
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
    <div className="py-24 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#08cb00]/[0.03] rounded-full blur-[180px] -z-10" />

      <section className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Making Cities <span className="text-[#08cb00] drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Better Together</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Real impact created by citizens and authorities working side by side to build a smarter, greener infrastructure.
          </p>
        </motion.div>

        {/* Impact Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(8, 203, 0, 0.4)"
              }}
              className="
                relative group p-10 rounded-[2.5rem] 
                bg-white/[0.03] backdrop-blur-[40px] 
                border border-white/10 border-t-white/20
                shadow-[0_20px_40px_rgba(0,0,0,0.2)]
                text-center transition-all duration-500
              "
            >
              {/* Icon with Neon Emerald Glow */}
              <div className="
                mx-auto mb-6 text-4xl text-[#08cb00]
                drop-shadow-[0_0_10px_rgba(8,203,0,0.4)]
                group-hover:drop-shadow-[0_0_20px_rgba(8,203,0,0.8)]
                group-hover:scale-110 transition-all duration-500
              ">
                {item.icon}
              </div>

              {/* Counter/Value */}
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter transition-colors group-hover:text-[#08cb00]">
                {item.value}
              </h3>

              {/* Label */}
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-white/60 transition-colors">
                {item.label}
              </p>

              {/* Bottom Glow Bar */}
              <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#08cb00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default CommunityImpact;