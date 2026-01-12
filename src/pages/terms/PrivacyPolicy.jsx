import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, Bell, Globe } from "lucide-react";

const policySections = [
  {
    icon: <ShieldCheck className="text-primary" />,
    title: "Information Collection",
    content: "We collect information you provide directly to us when you create an account, report an issue, or communicate with us. This includes your name, email address, location data for reports, and any photos uploaded to the platform.",
  },
  {
    icon: <Eye className="text-primary" />,
    title: "How We Use Data",
    content: "Your data is used to verify infrastructure reports, communicate updates regarding your submissions, and provide anonymous analytics to city authorities to help prioritize community repairs.",
  },
  {
    icon: <Lock className="text-primary" />,
    title: "Data Security",
    content: "We implement industry-standard encryption and security protocols to protect your personal information. Your account is protected by multi-layer authentication and data is stored on secure, high-performance servers.",
  },
  {
    icon: <Globe className="text-primary" />,
    title: "Public Visibility",
    content: "To maintain transparency, reported issues (including descriptions and photos) are visible to the public. However, your personal contact information is never shared with other citizens without your explicit consent.",
  },
  {
    icon: <Bell className="text-primary" />,
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal data at any time through your dashboard. You can also opt-out of non-essential notifications in your profile settings.",
  },
  {
    icon: <FileText className="text-primary" />,
    title: "Policy Updates",
    content: "CivicAlert may update this policy periodically. We will notify you of any significant changes via email or through a prominent notice on our platform before the changes take effect.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-500 pb-24">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            Trust & Safety
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black text-base-content leading-tight"
          >
            Privacy <span className="text-primary drop-shadow-[0_0_15px_rgba(8,203,0,0.3)]">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base-content/60 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            Last Updated: January 12, 2026. At CivicAlert, your trust is our most valuable asset. Learn how we handle and protect your data.
          </motion.p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policySections.map((section, index) => (
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
      </section>
    </div>
  );
};

export default PrivacyPolicy;