import React from "react";
import { FaArrowUp, FaMapMarkerAlt } from "react-icons/fa";
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
    description,
  } = issue || {};

  return (
    <div className="card bg-base-100 shadow-md h-full">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-lg font-semibold line-clamp-1">
          {title}
        </h2>

        {/* Category + Status */}
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="badge badge-outline">{category}</span>

          <span
            className={`badge ${
              status === "Pending"
                ? "badge-warning"
                : status === "Resolved"
                ? "badge-success"
                : "badge-info"
            }`}
          >
            {status}
          </span>

          <span
            className={`badge ${
              priority === "High" ? "badge-error" : "badge-secondary"
            }`}
          >
            {priority}
          </span>
        </div>

        

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FaMapMarkerAlt />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Actions */}
        <div className="card-actions justify-between items-center mt-4">
          {/* Upvote */}
          <button className="flex items-center gap-1 btn btn-sm btn-outline">
            <FaArrowUp />
            <span>{upvotes}</span>
          </button>

          {/* View Details */}
          <button
            onClick={() => navigate(`/issue-details/${_id}`)}
            className="btn btn-sm btn-primary text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
