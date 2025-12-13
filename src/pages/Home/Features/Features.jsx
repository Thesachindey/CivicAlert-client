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
    icon: <FaExclamationTriangle size={28} />,
    title: "Report City Issues",
    desc: "Easily report public infrastructure problems like broken roads, streetlights, water leaks, and more.",
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    icon: <FaMapMarkedAlt size={28} />,
    title: "Location-Based Tracking",
    desc: "Attach real locations with every issue so authorities can respond faster and accurately.",
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Citizen–Authority Collaboration",
    desc: "Admins and staff work together with citizens to verify, assign, and resolve reported issues.",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Track Progress & Impact",
    desc: "Monitor issue status updates, timelines, and resolution history in real time.",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    icon: <FaBell size={28} />,
    title: "Real-Time Notifications",
    desc: "Get instant alerts when your reported issue is reviewed, updated, or resolved.",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    icon: <FaCamera size={28} />,
    title: "Photo Evidence Upload",
    desc: "Upload images with reports to clearly show the problem and improve verification.",
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    icon: <FaUserShield size={28} />,
    title: "Role-Based Dashboards",
    desc: "Separate dashboards for citizens, staff, and admins for focused and efficient management.",
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    icon: <FaCheckCircle size={28} />,
    title: "Verified & Secure Reports",
    desc: "Authentication and moderation ensure reports are genuine and trustworthy.",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-base-100">
      {/* Section Header */}
      <motion.div
        className="text-center space-y-3 mb-14"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">
          Why <span className="logo-font text-primary">Civic Alert</span>?
        </h2>
        <p className="text-base-content/60 max-w-xl mx-auto">
          A transparent and efficient platform designed to connect citizens,
          staff, and administrators for faster city issue resolution.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
        {featureData.map((item, index) => (
          <motion.div
            key={index}
            className="text-center space-y-4 p-6 rounded-xl bg-base-200 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`mx-auto ${item.bg} ${item.color} p-4 rounded-full w-16 h-16 flex items-center justify-center`}
              whileHover={{ rotate: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {item.icon}
            </motion.div>

            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-base-content/60 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
