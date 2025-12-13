import React from "react";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaUserCheck,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    step: "Step 01",
    title: "Report an Issue",
    desc: "Citizens submit infrastructure issues with description, photos, and location for quick identification.",
    icon: <FaUserEdit size={26} />,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    step: "Step 02",
    title: "Review & Assign",
    desc: "Admins verify reports and assign the issue to the appropriate staff member.",
    icon: <FaUserCheck size={26} />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    step: "Step 03",
    title: "Work in Progress",
    desc: "Staff investigate, update status, and add progress notes while working on the issue.",
    icon: <FaTools size={26} />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    step: "Step 04",
    title: "Resolve & Close",
    desc: "The issue is resolved, closed, and fully tracked in the timeline for transparency.",
    icon: <FaCheckCircle size={26} />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200">
      {/* Header */}
      <motion.div
        className="text-center space-y-3 mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">
          How <span className="logo-font text-primary">Civic Alert</span> Works
        </h2>
        <p className="text-base-content/60 max-w-2xl mx-auto">
          From reporting a problem to resolving it — Civic Alert ensures every
          issue is tracked, transparent, and accountable.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all text-center space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-sm font-semibold text-primary">
              {item.step}
            </div>

            <div
              className={`mx-auto ${item.bg} ${item.color} p-4 rounded-full w-16 h-16 flex items-center justify-center`}
            >
              {item.icon}
            </div>

            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-base-content/60 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
