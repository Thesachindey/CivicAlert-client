import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowUp, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();

  const {
    _id,
    title,
    image,
    category,
    status,
    priority,
    location,
    upvotes,
    createdAt,
  } = issue || {};

  const statusColors = {
    'Pending': 'border-orange-500/40 text-orange-600 dark:text-orange-400 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.1)]',
    'In Progress': 'border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.1)]',
    'Working': 'border-indigo-500/40 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 shadow-[0_0_10px_rgba(99,102,241,0.1)]',
    'Resolved': 'border-[#08cb00]/40 text-[#06a100] dark:text-[#08cb00] bg-[#08cb00]/10 shadow-[0_0_10px_rgba(8,203,0,0.1)]',
    'Closed': 'border-base-content/20 text-base-content/40 bg-base-content/5',
    'Rejected': 'border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
  };
  
  const statusBadgeStyle = statusColors[status] || 'border-[#08cb00]/40 text-[#08cb00] bg-[#08cb00]/10';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
        relative flex flex-col h-full overflow-hidden
        /* THEME ADAPTIVE GLASS EFFECT */
        bg-base-100 dark:bg-base-200/40 backdrop-blur-[30px] 
        border border-base-content/10 dark:border-white/10
        shadow-md dark:shadow-[0_15px_35px_rgba(0,0,0,0.2)] 
        rounded-[2rem] transition-all duration-300
      "
    >
      {/* 1. IMAGE SECTION */}
      <figure 
        className="relative h-48 w-full cursor-pointer overflow-hidden" 
        onClick={() => navigate(`/issue-details/${_id}`)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {priority === 'High' && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-red-500/20 backdrop-blur-md border border-red-500/40 text-red-500 dark:text-red-400 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <FaRocket className="animate-pulse" /> High Priority
          </div>
        )}
      </figure>

      {/* 2. BODY SECTION */}
      <div className="flex flex-col flex-grow p-6 gap-3">
        
        <div className="flex justify-between items-start gap-4">
          <h2
            className="text-lg font-bold text-base-content leading-tight cursor-pointer hover:text-[#08cb00] transition-colors line-clamp-2"
            onClick={() => navigate(`/issue-details/${_id}`)}
          >
            {title}
          </h2>

          <span className={`px-2.5 py-1 border rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${statusBadgeStyle}`}>
            {status}
          </span>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 mt-1">
          <div className="flex items-center gap-2 text-base-content/60">
            <FaMapMarkerAlt className="text-[#08cb00] shrink-0" />
            <span className="text-xs font-medium line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-2 text-base-content/40">
            <FaCalendarAlt className="shrink-0" />
            <span className="text-xs">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* 3. FOOTER SECTION */}
        <div className="mt-auto pt-4 border-t border-base-content/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-[#08cb00]/5 border border-[#08cb00]/20 text-[#06a100] dark:text-[#08cb00] text-[10px] font-bold rounded-full">
              {category}
            </div>
            
            <div className="flex items-center gap-1.5 bg-base-content/5 px-2.5 py-1 rounded-full border border-base-content/5">
              <FaArrowUp className="text-orange-600 dark:text-orange-500 text-[10px]" /> 
              <span className="text-base-content text-[10px] font-bold">{upvotes}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/issue-details/${_id}`)}
            className="text-[#06a100] dark:text-[#08cb00] font-bold text-xs hover:underline underline-offset-4 transition-all cursor-pointer"
          >
            Details
          </button>
        </div>

      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-base-content/5 to-transparent opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-500" />
    </motion.div>
  );
};

export default IssueCard;