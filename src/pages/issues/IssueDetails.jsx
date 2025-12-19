import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router"; // Corrected import
import { motion } from "framer-motion";
import { MapPin, CalendarDays, User2, ThumbsUp, Edit, Trash2, Rocket, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingPage from "../LoadingPage/LoadingPage";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  const { data: upvoteStatus } = useQuery({
    queryKey: ["upvoteStatus", id, user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}/upvote-status?email=${user.email}`);
      return res.data.upvoted;
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/issues/upvote/${id}`, { email: user.email });
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
    if (!user) return navigate("/login");
    if (issue.createdBy === user.email) return toast.error("Cannot upvote own issue");
    if (upvoteStatus) return toast.error("Already upvoted");
    upvoteMutation.mutate();
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete Report?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/issues/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your issue has been deleted.', 'success');
            navigate('/all-issues');
          }
        } catch (err) {
          toast.error("Failed to delete");
        }
      }
    });
  };

  const handleBoost = async () => {
    const confirmPay = await Swal.fire({
      title: "Boost Priority?",
      text: "Boosting requires a 100tk fee. You will be redirected to Stripe.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay 100tk",
      cancelButtonText: "Cancel",
    });

    if (confirmPay.isConfirmed) {
      const toastId = toast.loading("Connecting to payment gateway...");
      try {
        const paymentInfo = {
          amount: 100,
          currency: 'bdt',
          paymentType: 'issue_promotion',
          customerName: user.displayName,
          customerEmail: user.email,
          issueData: issue
        };

        const { data } = await axiosSecure.post('/create-checkout-session', paymentInfo);

        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error("Failed to create payment session", { id: toastId });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error connecting to Stripe", { id: toastId });
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  const isOwner = user?.email === issue.createdBy;
  const isPending = issue.status === 'Pending';

  return (
<div className="py-4">
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans rounded-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 h-64 lg:h-auto relative">
            <img 
              src={issue.image} 
              alt={issue.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
             {/* Status Badge Over Image */}
             <div className="absolute top-4 left-4">
                <span className={`badge border-none text-white font-medium px-3 py-1 ${
                  issue.status === 'Resolved' ? 'bg-green-500' : 
                  issue.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}>
                  {issue.status}
                </span>
                 {issue.priority === 'High' && (
                    <span className="badge bg-red-500 border-none text-white font-medium px-3 py-1 ml-2 flex items-center gap-1">
                      <Rocket size={12}/> High Priority
                    </span>
                  )}
             </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{issue.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                 <div className="flex items-center gap-1">
                    <User2 size={16} />
                    <span>{issue.creatorName || issue.createdBy}</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {issue.description}
              </p>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="text-red-500" size={20} />
                <span className="font-medium">{issue.location}</span>
              </div>
              
              {/* Assigned Staff Info */}
               {issue.assignedStaff && (
                  <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="avatar placeholder">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <span className="text-xs font-bold"><User2 size={16}/></span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Assigned Staff</p>
                        <p className="text-xs text-gray-600">{issue.assignedStaff.name}</p>
                    </div>
                  </div>
               )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
               {/* Upvote Button */}
                <button
                  onClick={handleUpvote}
                  disabled={upvoteStatus || upvoteMutation.isPending}
                  className={`btn w-full btn-outline ${upvoteStatus ? "btn-disabled bg-gray-100 text-gray-400 border-gray-200" : "hover:bg-green-50 hover:text-green-600 hover:border-green-600 text-gray-600 border-gray-300"}`}
                >
                  <ThumbsUp size={18} className={upvoteStatus ? "fill-current" : ""} /> 
                  {upvoteStatus ? `Already Supported (${issue.upvotes})` : `Support This Issue (${issue.upvotes})`}
                </button>

               {/* Owner Actions */}
               {isOwner && (
                 <div className="grid grid-cols-2 gap-3">
                    {isPending ? (
                        <>
                           <Link to={`/dashboard/edit-issue/${id}`} className="btn btn-sm btn-outline btn-info">
                              <Edit size={14}/> Edit
                           </Link>
                           <button onClick={handleDelete} className="btn btn-sm btn-outline btn-error">
                              <Trash2 size={14}/> Delete
                           </button>
                        </>
                    ) : (
                       <div className="col-span-2 text-center text-xs text-gray-400 italic">
                          Actions disabled while processing.
                       </div>
                    )}
                    
                    {issue.priority !== 'High' && (
                        <button onClick={handleBoost} className="btn btn-sm btn-warning w-full col-span-2 text-white">
                            <Rocket size={14}/> Boost Priority (100tk)
                        </button>
                    )}
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
               <CheckCircle size={18} className="text-green-500"/> Activity Timeline
            </h3>
            <div className="space-y-4">
                {issue.timeline?.map((log, idx) => (
                    <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                            {idx !== issue.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1"></div>}
                        </div>
                        <div className="pb-4">
                            <p className="text-sm font-medium text-gray-800">{log.status}</p>
                            <p className="text-xs text-gray-500">{log.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{new Date(log.date).toLocaleString()} • {log.updatedBy}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </motion.div>
    </div>
    </div>
  );
};

export default IssueDetails;