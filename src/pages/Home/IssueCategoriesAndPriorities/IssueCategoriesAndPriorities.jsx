import React from "react";
import { motion } from "framer-motion";
import {
  FaRoad,
  FaWater,
  FaLightbulb,
  FaTrash,
  FaExclamationTriangle,
  FaVolumeUp,
  FaEllipsisH,
} from "react-icons/fa";

const issues = [
  {
    icon: FaRoad,
    title: "Road Damage",
    desc: "Report potholes, broken roads, and unsafe footpaths affecting daily travel.",
    bg: "bg-orange-50",
  },
  {
    icon: FaWater,
    title: "Water Leakage",
    desc: "Identify leaking pipes, drainage failures, and water supply problems.",
    bg: "bg-blue-50",
  },
  {
    icon: FaLightbulb,
    title: "Street Lighting",
    desc: "Report non-functional street lights that reduce safety at night.",
    bg: "bg-yellow-50",
  },
  {
    icon: FaTrash,
    title: "Waste Management",
    desc: "Garbage overflow, missed collections, and sanitation issues.",
    bg: "bg-green-50",
  },
  {
    icon: FaExclamationTriangle,
    title: "Public Safety",
    desc: "Open manholes, fallen trees, or hazards threatening public safety.",
    bg: "bg-red-50",
  },
 {
  icon: FaEllipsisH,
  title: "Others",
  desc: "Any public issue that does not fall into existing categories but still requires attention from authorities.",
  bg: "bg-gray-50",
},

];

export default function IssueFeaturesSection() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
         
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Issues citizens can report using{" "}
            <span className="logo-font text-primary">CivicAlert</span>
          </h2>
          <p className="mt-4 text-base-content/60 max-w-2xl mx-auto">
            Easily report public infrastructure problems and help authorities
            take faster, data-driven action.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
              >
                {/* Image Area */}
                <div
                  className={`h-40 rounded-t-2xl flex items-center justify-center ${item.bg}`}
                >
                  <div className="h-16 w-16 rounded-xl bg-white shadow flex items-center justify-center text-primary">
                    <Icon className="text-3xl" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
