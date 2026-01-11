import React from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaUserCheck,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const steps = [
  {
    step: "Step 01",
    title: "Report an Issue",
    desc: "Citizens submit infrastructure issues with description, photos, and location for quick identification.",
    icon: <FaUserEdit size={26} />,
  },
  {
    step: "Step 02",
    title: "Review & Assign",
    desc: "Admins verify reports and assign the issue to the appropriate staff member.",
    icon: <FaUserCheck size={26} />,
  },
  {
    step: "Step 03",
    title: "Work in Progress",
    desc: "Staff investigate, update status, and add progress notes while working on the issue.",
    icon: <FaTools size={26} />,
  },
  {
    step: "Step 04",
    title: "Resolve & Close",
    desc: "The issue is resolved, closed, and fully tracked in the timeline for transparency.",
    icon: <FaCheckCircle size={26} />,
  },
  {
    step: "Step 05",
    title: "Feedback & Analytics",
    desc: "Citizens provide feedback after resolution, helping authorities analyze performance and improve responses.",
    icon: <FaUserCheck size={26} />,
  },
  {
    step: "Step 06",
    title: "Public Transparency",
    desc: "All resolved and ongoing issues remain publicly visible, ensuring accountability and building trust.",
    icon: <FaCheckCircle size={26} />,
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden px-4">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#08cb00]/[0.02] rounded-full blur-[180px] -z-10" />

      {/* Header */}
      <motion.div 
        className="text-center space-y-4 mb-20"
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "circOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
          How <span className="text-[#08cb00] drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Civic Alert</span> Works
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
          From reporting a problem to resolving it — Civic Alert ensures every
          issue is tracked, transparent, and accountable.
        </p>
      </motion.div>

      {/* Swiper */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={2}
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier:0,
            slideShadows: false,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          className="pb-16"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {steps.map((item, index) => (
            <SwiperSlide key={index} className="px-4">
              <motion.div 
                className="
                  relative group p-10 rounded-[3rem] 
                  bg-white/[0.03] backdrop-blur-[50px] 
                  border border-white/10 border-t-white/20
                  shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                  text-center transition-all duration-500
                "
                whileHover={{ y: -10 }}
              >
                {/* Step Indicator */}
                <div className="text-[10px] font-black text-[#08cb00] uppercase tracking-[0.4em] mb-6 opacity-60">
                  {item.step}
                </div>

                {/* Icon with Neon Glow */}
                <div className="
                  mx-auto mb-8 w-20 h-20 flex items-center justify-center rounded-[2rem]
                  bg-[#08cb00]/10 text-[#08cb00] border border-[#08cb00]/20
                  shadow-[0_0_30px_rgba(8,203,0,0.1)]
                  group-hover:shadow-[0_0_40px_rgba(8,203,0,0.4)]
                  transition-all duration-500
                ">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#08cb00] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
                  {item.desc}
                </p>

                {/* Bottom Specular Shine */}
                <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#08cb00]/20 to-transparent" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Global Style overrides for Swiper Pagination */}
      <style>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2) !important;
          width: 12px;
          height: 4px;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #08cb00 !important;
          width: 30px;
          box-shadow: 0 0 10px rgba(8, 203, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;