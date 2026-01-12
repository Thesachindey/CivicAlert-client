import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonialData = [
  {
    name: "Rahat Islam",
    role: "Premium Citizen",
    image: "https://i.pravatar.cc/150?u=rahat",
    comment: "The priority support is worth every bit. I reported a broken streetlight in my para, and it was fixed within 48 hours. Incredible transparency!",
  },
  {
    name: "Sultana Ahmed",
    role: "City Staff",
    image: "https://i.pravatar.cc/150?u=sultana",
    comment: "The dashboard makes my job so much easier. I can see exactly where the issues are and update citizens on progress instantly. No more paperwork!",
  },
  {
    name: "Zayan Malik",
    role: "Administrator",
    image: "https://i.pravatar.cc/150?u=zayan",
    comment: "Managing an entire city's infrastructure used to be a nightmare. CivicAlert provides the analytics we need to allocate resources efficiently.",
  },
  {
    name: "Anika Tabassum",
    role: "Citizen",
    image: "https://i.pravatar.cc/150?u=anika",
    comment: "I love the activity timeline. It feels great to see exactly when the admin reviews my report and when the staff starts working on it.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden px-6 bg-base-100 transition-colors duration-500">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
            Voices of the <span className="text-[#08cb00] drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Community</span>
          </h2>
          <p className="text-base-content/60 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Discover how CivicAlert is transforming urban management through the eyes of those who use it every day.
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}       
          className="pb-16 testimonial-swiper"
        >
          {testimonialData.map((user, index) => (
            <SwiperSlide key={index}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="
                
                  relative p-10 h-full rounded-[3rem] 
                  /* UPDATED: Darker off-white (base-200) with 70% opacity for better visibility */
                  bg-base-200/40 dark:bg-base-200/40 
                  backdrop-blur-xl 
                  border   dark:border-base-content/10
                  shadow-none
                  flex flex-col gap-6 transition-all duration-500
                "
              >
                {/* Quote Icon */}
                <div className="text-[#748074] opacity-40">
                  <Quote size={40} fill="currentColor" />
                </div>

                <p className="text-base-content/70 text-lg italic font-light leading-relaxed flex-grow">
                  "{user.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-base-content/5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#08cb00]/40 rounded-full blur-md opacity-30 dark:opacity-100" />
                    <img 
                      src={user.image} 
                      alt={user.name} 
                      className="relative w-14 h-14 rounded-full border-2 border-[#08cb00] object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base-content font-bold text-lg">{user.name}</h4>
                    <p className="text-[#08cb00] text-[10px] font-black uppercase tracking-widest">
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="absolute top-8 right-10 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#08cb00]" fill="currentColor" />
                  ))}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonial-swiper .swiper-pagination-bullet {
          /* Higher contrast for light mode */
          background: oklch(var(--bc) / 0.3) !important;
          width: 8px;
          height: 8px;
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #08cb00 !important;
          box-shadow: 0 0 10px rgba(8, 203, 0, 0.4);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;