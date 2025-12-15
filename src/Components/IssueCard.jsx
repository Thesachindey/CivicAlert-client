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
   <div className="card bg-base-100 shadow-md h-full w-full flex flex-col">
  {/* Image */}
  <figure className="h-48 overflow-hidden">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"
    />
  </figure>

  {/* Body */}
  <div className="card-body flex flex-col">
    {/* Title */}
    <h2 className="card-title text-lg font-semibold line-clamp-1">
      {title}
    </h2>

    {/* Category / Status / Priority */}
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
    <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
      <FaMapMarkerAlt className="text-base" />
      <span className="line-clamp-1">{location}</span>
    </div>

    {/* Spacer pushes actions down */}
    <div className="mt-auto pt-4 flex items-center justify-between">
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
