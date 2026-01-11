import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What kind of issues can I report?",
    answer: "You can report any real-world infrastructure problems such as broken roads (potholes), water leakage, non-functional streetlights, garbage overflow, and public safety hazards.",
  },
  {
    question: "Is there a limit on how many issues I can report?",
    answer: "Standard citizens can report up to 3 issues. To report unlimited issues, you can upgrade to a Premium Subscription for 1,000 BDT.",
  },
  {
    question: "What does 'Boosting' an issue do?",
    answer: "Boosting an issue for 100 BDT sets its priority to 'High' and moves it to the top of the list for admins and staff, ensuring faster attention and resolution.",
  },
  {
    question: "How do I track the progress of my report?",
    answer: "Every issue has a dedicated 'Activity Timeline.' You can see real-time updates from when it is assigned to staff until it is marked as 'Resolved' or 'Closed.'",
  },
  {
    question: "Can I edit or delete my report after submitting?",
    answer: "You can edit or delete your report as long as its status is still 'Pending.' Once a staff member is assigned and work begins, editing is locked to ensure data integrity.",
  },
  {
    question: "What is the purpose of the 'Upvote' button?",
    answer: "Upvoting allows other citizens to show support for an issue. Issues with more upvotes signal high public importance to authorities, helping them prioritize their tasks.",
  },
];

const FAQItem = ({ item, isOpen, toggle }) => {
  return (
    <motion.div
      initial={false}
      className={`
        mb-4 overflow-hidden transition-all duration-500
        rounded-[2rem] border ${isOpen ? 'border-[#08cb00]/40 bg-white/10' : 'border-white/10 bg-white/[0.03]'}
        backdrop-blur-[40px] shadow-2xl
      `}
    >
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full p-6 text-left cursor-pointer"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#08cb00]' : 'text-white/80'}`}>
          {item.question}
        </span>
        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-[#08cb00] text-black rotate-180' : 'bg-white/5 text-white'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <div className="px-6 pb-6 text-white/50 font-light leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden px-6">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#08cb00]/30 bg-[#08cb00]/5 text-[#08cb00] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
             Help Center
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Frequently Asked <span className="text-[#08cb00]">Questions</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base md:text-lg font-light">
            Everything you need to know about reporting, tracking, and improving our community infrastructure.
          </p>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;