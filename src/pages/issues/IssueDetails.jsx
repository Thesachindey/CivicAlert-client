import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
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
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08cb00',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/issues/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'The report has been removed.', 'success');
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
      confirmButtonColor: '#08cb00',
    });

    if (confirmPay.isConfirmed) {
      const toastId = toast.loading("Connecting to Stripe...");
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
        if (data.url) window.location.href = data.url;
        else toast.error("Payment session failed", { id: toastId });
      } catch (error) {
        toast.error("Stripe Connection Error", { id: toastId });
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  const isOwner = user?.email === issue.createdBy;
  const isPending = issue.status === 'Pending';

  // --- NEON STATUS BADGE LOGIC ---
  const statusConfig = {
    'Resolved': 'border-[#08cb00]/40 text-[#08cb00] bg-[#08cb00]/10 shadow-[0_0_15px_rgba(8,203,0,0.3)]',
    'In Progress': 'border-blue-500/40 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    'Pending': 'border-orange-500/40 text-orange-400 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
  };

  return (
    <div className="py-10 px-4 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#08cb00]/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#08cb00]/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto rounded-[3.5rem] overflow-hidden bg-white/[0.03] backdrop-blur-[60px] border border-white/10 border-t-white/20 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row">
          
          {/* Image Section */}
          <div className="lg:w-1/2 min-h-[400px] relative overflow-hidden">
            <img 
              src={issue.image} 
              alt={issue.title} 
              // Increased grayscale slightly for better initial contrast
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
            />
            
            {/* --- UPDATED DARK OVERLAYS FOR TEXT CLARITY --- */}
            {/* 1. Base dark tint layer across the entire image */}
            <div className="absolute inset-0 bg-[#020d00]/50" />
            
            {/* 2. Stronger bottom-to-top gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020d00] via-[#020d00]/30 to-transparent" />
            {/* ----------------------------------------------- */}
            
            {/* Badges Over Image (Added z-10 to ensure they sit above the new dark overlays) */}
            <div className="absolute top-6 left-6 flex gap-3 z-10">
              <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${statusConfig[issue.status] || 'border-white/20 text-white'}`}>
                {issue.status}
              </span>
              {issue.priority === 'High' && (
                <span className="bg-red-500/20 border border-red-500/40 text-red-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <Rocket size={12} className="animate-pulse" /> High Priority
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                {issue.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/40 mb-8 pb-8 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <User2 size={16} className="text-[#08cb00]" />
                  <span className="text-sm font-medium">{issue.creatorName || issue.createdBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-[#08cb00]" />
                  <span className="text-sm">{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  <span className="text-sm text-white/60">{issue.location}</span>
                </div>
              </div>

              <p className="text-lg text-white/60 leading-relaxed font-light mb-10">
                {issue.description}
              </p>
              
              {issue.assignedStaff && (
                <div className="inline-flex items-center gap-4 p-4 rounded-3xl bg-[#08cb00]/5 border border-[#08cb00]/20 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-full bg-[#08cb00]/20 flex items-center justify-center border border-[#08cb00]/30">
                    <User2 size={20} className="text-[#08cb00]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Assigned Staff</p>
                    <p className="text-sm font-bold text-[#08cb00]">{issue.assignedStaff.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
              <button
                onClick={handleUpvote}
                disabled={upvoteStatus || upvoteMutation.isPending}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-bold tracking-widest uppercase text-xs border ${
                  upvoteStatus 
                  ? "bg-white/5 border-white/10 text-white/20 cursor-not-allowed" 
                  : "bg-[#08cb00]/10 border-[#08cb00]/30 text-[#08cb00] hover:bg-[#08cb00] hover:text-black shadow-[0_0_20px_rgba(8,203,0,0.1)]"
                }`}
              >
                <ThumbsUp size={18} className={upvoteStatus ? "fill-current" : ""} /> 
                {upvoteStatus ? `Already Supported (${issue.upvotes})` : `Support This Issue (${issue.upvotes})`}
              </button>

              {isOwner && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isPending ? (
                    <>
                      <Link to={`/dashboard/edit-issue/${id}`} className="flex items-center justify-center gap-2 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                        <Edit size={14}/> Edit Report
                      </Link>
                      <button onClick={handleDelete} className="flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={14}/> Delete Report
                      </button>
                    </>
                  ) : (
                    <div className="col-span-2 text-center py-3 bg-white/5 rounded-2xl text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                      Processing Locked
                    </div>
                  )}
                  
                  {issue.priority !== 'High' && (
                    <button onClick={handleBoost} className="col-span-2 py-4 bg-amber-400 text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-[1.02] transition-all">
                      <Rocket size={16} className="inline-block mr-2" /> Boost to High Priority (100tk)
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white/[0.02] p-8 lg:p-12 border-t border-white/5">
          <h3 className="text-xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-widest">
            <CheckCircle size={22} className="text-[#08cb00]"/> Activity Log
          </h3>
          <div className="max-w-3xl space-y-8">
            {issue.timeline?.map((log, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#08cb00] rounded-full shadow-[0_0_10px_#08cb00] group-hover:scale-125 transition-transform"></div>
                  {idx !== issue.timeline.length - 1 && <div className="w-[1px] h-full bg-white/10 my-2"></div>}
                </div>
                <div className="pb-8">
                  <p className="text-[#08cb00] font-black text-xs uppercase tracking-widest mb-2">{log.status}</p>
                  <p className="text-white/70 text-base font-light mb-3 leading-relaxed">{log.message}</p>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-tighter">
                    <span>{new Date(log.date).toLocaleString()}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>Updated By: {log.updatedBy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IssueDetails;