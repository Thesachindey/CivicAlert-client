import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaExclamationTriangle,
  FaChartLine,
  FaBell,
  FaCamera,
  FaUserShield,
  FaCheckCircle,
} from "react-icons/fa";

const featureData = [
  {
    icon: <FaExclamationTriangle size={24} />,
    title: "Report City Issues",
    desc: "Easily report public infrastructure problems like broken roads, streetlights, and water leaks.",
  },
  {
    icon: <FaMapMarkedAlt size={24} />,
    title: "Location Tracking",
    desc: "Attach real locations with every issue so authorities can respond faster and accurately.",
  },
  {
    icon: <FaUsers size={24} />,
    title: "Collaborative Action",
    desc: "Admins and staff work together with citizens to verify, assign, and resolve reported issues.",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "Track Progress",
    desc: "Monitor issue status updates, timelines, and resolution history in real time.",
  },
  {
    icon: <FaBell size={24} />,
    title: "Real-Time Alerts",
    desc: "Get instant alerts when your reported issue is reviewed, updated, or resolved.",
  },
  {
    icon: <FaCamera size={24} />,
    title: "Photo Evidence",
    desc: "Upload images with reports to clearly show the problem and improve verification.",
  },
  {
    icon: <FaUserShield size={24} />,
    title: "Focused Dashboards",
    desc: "Separate dashboards for citizens, staff, and admins for efficient management.",
  },
  {
    icon: <FaCheckCircle size={24} />,
    title: "Secure Verification",
    desc: "Authentication and moderation ensure reports are genuine and trustworthy.",
  },
];

const Features = () => {
  // 1. Unified Spring Variants (Matching Banner)
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
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />

      {/* Section Header */}
      <motion.div
        className="text-center space-y-4 mb-20 px-6"
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "circOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
          Why <span className="text-[#08cb00] drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Civic Alert</span>?
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
          A transparent and efficient platform designed to connect citizens,
          staff, and administrators for faster city issue resolution.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {featureData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderColor: "rgba(8, 203, 0, 0.4)"
            }}
            className="
                relative group p-8 rounded-[2.5rem] 
                bg-white/[0.03] backdrop-blur-[40px] 
                border border-white/10 border-t-white/20
                shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                transition-all duration-500
            "
          >
            {/* Icon Container with Emerald Glow */}
            <motion.div
              className="
                w-14 h-14 mb-6 flex items-center justify-center rounded-2xl
                bg-[#08cb00]/10 text-[#08cb00] border border-[#08cb00]/20
                shadow-[0_0_20px_rgba(8,203,0,0.1)]
                group-hover:shadow-[0_0_30px_rgba(8,203,0,0.3)]
                transition-all duration-500
              "
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              {item.icon}
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#08cb00] transition-colors">
              {item.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors">
              {item.desc}
            </p>

            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#08cb00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;