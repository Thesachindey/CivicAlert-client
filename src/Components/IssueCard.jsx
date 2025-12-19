import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowUp, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router";

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

  // diff status colors
  const statusColors = {
    'Pending': 'bg-orange-400',
    'In Progress': 'bg-blue-500',
    'Working': 'bg-indigo-500',
    'Resolved': 'bg-green-500',
    'Closed': 'bg-gray-600',
    'Rejected': 'bg-red-500',
  };
  const badgeColor = statusColors[status] || 'bg-green-400';



  return (
    <div
      className='card bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden h-full border border-gray-100 flex flex-col'

    >

      {/* img  */}
      <figure className="relative h-48 w-full cursor-pointer" onClick={() => navigate(`/issue-details/${_id}`)}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {priority === 'High' && (
          <div className="absolute top-2 left-2 badge bg-red-500 border-none text-white text-xs gap-1 shadow-sm">
            <FaRocket size={10} /> High Priority
          </div>
        )}
      </figure>

      <div className="card-body p-5 gap-2 flex-grow">

        <div className="flex justify-between items-start gap-2">
          <h2
            className="card-title text-lg font-bold text-gray-800 leading-snug cursor-pointer hover:text-green-600 transition-colors"
            onClick={() => navigate(`/issue-details/${_id}`)}
          >
            {title}
          </h2>

          <span className={`badge  badge-sm border-none text-white font-semibold rounded-md px-2 py-3 uppercase text-[10px] tracking-wider ${badgeColor}`}>
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mt-1">
          <FaMapMarkerAlt className="text-green-500 text-lg" />
          <span className="text-sm font-medium line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <FaCalendarAlt className="text-blue-500 text-lg" />
          <span className="text-sm">{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="badge badge-outline border-green-500 text-green-600 text-xs font-medium py-3">
              {category}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">
              <FaArrowUp className="text-orange-500" /> {upvotes}
            </div>
          </div>

          <button
            onClick={() => navigate(`/issue-details/${_id}`)}
            className="text-blue-600 font-semibold text-sm hover:underline hover:text-blue-800 transition-colors"
          >
            View details...
          </button>
        </div>

      </div>
    </div>
  );
};

export default IssueCard;