import React from "react";
import { motion } from "framer-motion";
import { Gavel, UserCheck, CreditCard, AlertCircle, Trash2, Ban } from "lucide-react";

const termSections = [
  {
    icon: <UserCheck className="text-primary" />,
    title: "User Eligibility",
    content: "By using CivicAlert, you represent that you are at least 18 years of age and have the legal capacity to enter into these terms. You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    icon: <AlertCircle className="text-primary" />,
    title: "Reporting Guidelines",
    content: "Reports must be accurate and filed in good faith. Users are strictly prohibited from submitting false, misleading, or malicious reports. Reports containing offensive language or inappropriate imagery will be removed immediately.",
  },
  {
    icon: <CreditCard className="text-primary" />,
    title: "Subscription & Payments",
    content: "Premium features and issue boosting require one-time payments. All transactions are processed securely. Subscriptions are non-refundable unless required by law or in cases of documented technical failure.",
  },
  {
    icon: <Gavel className="text-primary" />,
    title: "Intellectual Property",
    content: "The CivicAlert name, logo, and platform design are protected by intellectual property laws. Users retain ownership of photos uploaded but grant CivicAlert a license to use them for public infrastructure resolution purposes.",
  },
  {
    icon: <Ban className="text-primary" />,
    title: "Prohibited Conduct",
    content: "You may not use the platform for any illegal purpose, attempt to reverse-engineer our software, or use automated systems (bots) to scrape data or submit reports without our express permission.",
  },
  {
    icon: <Trash2 className="text-primary" />,
    title: "Account Termination",
    content: "CivicAlert reserves the right to suspend or terminate accounts that violate these terms. This includes repeat offenders of false reporting or users who attempt to compromise the security of other citizens.",
  },
];

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-500 pb-24">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden px-6">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            Legal Agreement
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black text-base-content leading-tight"
          >
            Terms & <span className="text-primary drop-shadow-[0_0_15px_rgba(8,203,0,0.3)]">Conditions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base-content/60 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            Effective Date: January 12, 2026. Please read these terms carefully before using the CivicAlert platform to improve your community.
          </motion.p>
        </div>
      </section>

      {/* Terms Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {termSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="
                relative p-8 rounded-[2.5rem]
                bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl
                border-2 border-base-300 dark:border-white/5
                hover:border-primary/30 transition-all duration-500
                group
              "
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(8,203,0,0.1)]">
                {section.icon}
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4 group-hover:text-primary transition-colors">
                {section.title}
              </h3>
              <p className="text-base-content/60 leading-relaxed font-light">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Note on Acceptance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-10 rounded-[3rem] bg-base-200/50 border-2 border-base-300 dark:border-white/5 backdrop-blur-md text-center"
        >
          <p className="text-base-content/50 italic font-light">
            By accessing or using the platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of the service.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsConditions;