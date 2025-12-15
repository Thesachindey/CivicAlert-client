import React from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
  {
  step: "Step 05",
  title: "Feedback & Analytics",
  desc: "Citizens provide feedback after resolution, helping authorities analyze performance and improve future responses.",
  icon: <FaUserCheck size={26} />,
  bg: "bg-purple-100",
  color: "text-purple-600",
},
{
  step: "Step 06",
  title: "Public Transparency",
  desc: "All resolved and ongoing issues remain publicly visible, ensuring accountability and building long-term trust with citizens.",
  icon: <FaCheckCircle size={26} />,
  bg: "bg-indigo-100",
  color: "text-indigo-600",
}

  
];

const HowItWorks = () => {
  return (
    <section className="py-8 md:p-20 rounded-3xl bg-base-200">
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <h2 className="text-4xl font-bold">
          How <span className="logo-font text-primary">Civic Alert</span> Works
        </h2>
        <p className="text-base-content/60 max-w-2xl mx-auto">
          From reporting a problem to resolving it — Civic Alert ensures every
          issue is tracked, transparent, and accountable.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={2}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 180,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className=""
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {steps.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center space-y-4 mx-4">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HowItWorks;
