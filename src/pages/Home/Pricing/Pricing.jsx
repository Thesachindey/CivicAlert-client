import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import SciFiButton from "../../../Components/SciFiButton";
import { AuthContext } from "../../../context/AuthContext";

const Pricing = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user state

  const pricingData = [
    {
      title: "Standard",
      price: "Free",
      description: "Ideal for concerned citizens wanting to help their local neighborhood.",
      features: [
        { text: "Report up to 3 Issues", included: true },
        { text: "Public Activity Timeline", included: true },
        { text: "Community Support", included: true },
        { text: "Standard Priority", included: true },
        { text: "Premium Profile Badge", included: false },
        { text: "Unlimited Reporting", included: false },
      ],
      buttonText: user ? "Report Issue" : "Get Started",
      // REDIRECTION LOGIC: If user is logged in, go to report page, else go to register
      path: user ? "/dashboard/report-issue" : "/register",
      highlight: false,
    },
    {
      title: "Premium",
      price: "1,000 BDT",
      description: "For active community leaders who want to drive city-wide change.",
      features: [
        { text: "Unlimited Issue Reporting", included: true },
        { text: "Premium Citizen Badge", included: true },
        { text: "Priority Verification", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Exclusive Dashboard", included: true },
        { text: "Direct Staff Feedback", included: true },
      ],
      buttonText: "Upgrade Now",
      path: "/dashboard/my-profile",
      highlight: true,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden px-6">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Choose Your <span className="text-[#08cb00]">Impact</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light">
            Support your city's growth and unlock exclusive reporting features with our premium membership.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`
                relative p-10 rounded-[3.5rem] flex flex-col h-full
                bg-white/[0.03] backdrop-blur-[50px] 
                border transition-all duration-500
                ${plan.highlight ? 'border-[#08cb00]/40 shadow-[0_0_40px_rgba(8,203,0,0.15)]' : 'border-white/10'}
              `}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#08cb00] text-black px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_#08cb00] z-20">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-black uppercase tracking-widest mb-2 ${plan.highlight ? 'text-[#08cb00]' : 'text-white/60'}`}>
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  {plan.highlight && <span className="text-white/40 text-xs uppercase font-bold tracking-tighter">/ One-time</span>}
                </div>
                <p className="mt-4 text-white/40 text-sm font-light leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${feature.included ? 'bg-[#08cb00]/20 text-[#08cb00]' : 'bg-white/5 text-white/20'}`}>
                      {feature.included ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                    </div>
                    <span className={`text-sm ${feature.included ? 'text-white/70' : 'text-white/20 line-through'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-auto">
                <SciFiButton name={plan.buttonText} path={plan.path} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;