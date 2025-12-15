import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, User2, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // -----------------------------
  // Fetch issue details
  // -----------------------------
  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  // -----------------------------
  // Check upvote status
  // -----------------------------
  const { data: upvoteStatus } = useQuery({
    queryKey: ["upvoteStatus", id, user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues/${id}/upvote-status?email=${user.email}`
      );
      return res.data.upvoted;
    },
  });

  // -----------------------------
  // Upvote mutation
  // -----------------------------
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/issues/upvote/${id}`, {
        email: user.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issue", id]);
      queryClient.invalidateQueries(["upvoteStatus", id, user?.email]);
      toast.success("Upvoted successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to upvote");
    },
  });

  const handleUpvote = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (issue.createdBy === user.email) {
      toast.error("You cannot upvote your own issue");
      return;
    }

    if (upvoteStatus) {
      toast.error("You already upvoted this issue");
      return;
    }

    upvoteMutation.mutate();
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg w-full h-[400px]">
          <motion.img
            src={issue.image}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">{issue.title}</h1>

          <p className="text-gray-600 leading-relaxed">
            {issue.description}
          </p>

          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin /> {issue.location}
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <CalendarDays /> Reported on:{" "}
              {new Date(issue.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <User2 /> Reported by: {issue.createdBy}
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-3 pt-4">
            <span className="badge badge-outline">{issue.category}</span>

            <span
              className={`badge ${
                issue.priority === "High"
                  ? "badge-error"
                  : "badge-warning"
              }`}
            >
              {issue.priority}
            </span>

            <span
              className={`badge ${
                issue.status === "Resolved"
                  ? "badge-success"
                  : issue.status === "In Progress"
                  ? "badge-info"
                  : "badge-ghost"
              }`}
            >
              {issue.status}
            </span>
          </div>

          {/* Upvote */}
          <div className="pt-6 flex items-center gap-4">
            <button
              onClick={handleUpvote}
              disabled={upvoteStatus || upvoteMutation.isPending}
              className={`btn gap-2 ${
                upvoteStatus ? "btn-disabled" : "btn-primary"
              }`}
            >
              <ThumbsUp size={18} />
              Upvote
            </button>

            <span className="text-lg font-semibold">
              {issue.upvotes} Upvotes
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IssueDetails;
