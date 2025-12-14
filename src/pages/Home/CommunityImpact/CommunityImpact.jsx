import { FaCheckCircle, FaClock, FaUsers, FaBullhorn } from "react-icons/fa";
import { motion } from "framer-motion";

const impactData = [
  {
    icon: <FaBullhorn />,
    value: "12,450+",
    label: "Issues Reported",
    color: "text-red-500",
  },
  {
    icon: <FaCheckCircle />,
    value: "9,820+",
    label: "Issues Resolved",
    color: "text-green-500",
  },
  {
    icon: <FaClock />,
    value: "3.2 Days",
    label: "Avg Resolution Time",
    color: "text-yellow-500",
  },
  {
    icon: <FaUsers />,
    value: "4,300+",
    label: "Active Citizens",
    color: "text-blue-500",
  },
];

const CommunityImpact = () => {
  return (
    <div className="py-20">
    <section className="py-20 bg-base-200 rounded-3xl">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">
          Making Cities <span className="logo-font text-primary">Better Together</span>
        </h2>
        <p className="text-base-content/60 mb-12">
          Real impact created by citizens and authorities working side by side.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-base-100 p-6 rounded-2xl shadow-md"
            >
              <div className={`text-4xl mb-3 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-sm text-base-content/60">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default CommunityImpact;
