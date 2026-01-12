import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaImage, FaCrown, FaRocket } from "react-icons/fa";
import { MapPin, AlertCircle, FileText, Type } from "lucide-react"; // Added for modern feel
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../utils/img";
import LoadingPage from "../../LoadingPage/LoadingPage";

const InsertIssue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch User Status & Post Count
  const { data: userStats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const userRes = await axiosSecure.get(`/users/${user.email}`);
      const issuesRes = await axiosSecure.get(`/my-issues/${user.email}`);
      return {
        isPremium: userRes.data?.isPremium,
        postCount: issuesRes.data?.length || 0
      };
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (issueData) => await axiosSecure.post("/issues", issueData),
    onSuccess: () => {
      toast.success("Issue reported successfully!");
      reset();
      navigate("/dashboard/my-issues");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit issue");
    },
  });

  const handleInsertIssue = async (data) => {
    if (!user) return toast.error("Please login to submit an issue");

    // Check post limits for free users
    if (!userStats.isPremium && userStats.postCount >= 3) {
      Swal.fire({
        title: 'Limit Reached',
        text: 'Free users can only report 3 issues. Upgrade to Premium for unlimited access!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#08cb00',
        confirmButtonText: 'Upgrade Now'
      }).then((res) => {
        if (res.isConfirmed) navigate('/dashboard/my-profile');
      });
      return;
    }

    // Handle Payment logic for High Priority
    if (data.priority === "High") {
      const confirmPay = await Swal.fire({
        title: "High Priority Boost",
        text: "This requires a 100tk fee. Redirecting to Stripe for secure payment.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Proceed to Pay",
        confirmButtonColor: '#08cb00',
      });

      if (confirmPay.isConfirmed) {
        const toastId = toast.loading("Processing report & payment...");
        try {
          const imageUrl = await imageUpload(data.image[0]);
          const issueData = {
            title: data.title.trim(),
            description: data.description.trim(),
            category: data.category,
            priority: "High",
            location: data.location.trim(),
            image: imageUrl,
            status: "Pending",
            createdBy: user.email,
            creatorName: user.displayName,
            creatorPhoto: user.photoURL,
            createdAt: new Date().toISOString(),
          };

          const paymentInfo = {
            amount: 100,
            currency: 'bdt',
            paymentType: 'issue_promotion',
            customerName: user.displayName,
            customerEmail: user.email,
            issueData: issueData
          };

          const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
          if (res.data?.url) {
            window.location.href = res.data.url;
          } else {
            toast.error("Payment failed to initialize", { id: toastId });
          }
        } catch (err) {
          toast.error("An error occurred during payment initiation", { id: toastId });
        }
      }
      return;
    }

    // Submit Normal Report
    const confirm = await Swal.fire({
      title: "Submit Report?",
      text: "Confirm details before sending to city authorities.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#08cb00',
      confirmButtonText: "Yes, Submit",
    });

    if (!confirm.isConfirmed) return;

    try {
      const imageUrl = await imageUpload(data.image[0]);
      const issueData = {
        title: data.title.trim(),
        description: data.description.trim(),
        category: data.category,
        priority: "Normal",
        location: data.location.trim(),
        image: imageUrl,
        status: "Pending",
        upvotes: 0,
        upvotedBy: [],
        createdBy: user.email,
        creatorName: user.displayName,
        creatorPhoto: user.photoURL,
        createdAt: new Date().toISOString(),
      };
      await mutateAsync(issueData);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  if (statsLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <title>Report Issue | Civic Alert</title>

        {/* Header with Stats Badge */}
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            Report an <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Issue</span>
          </h2>
          <p className="text-base-content/50 uppercase tracking-[0.2em] text-[10px] font-bold">Help improve public infrastructure</p>

          <div className="flex justify-center">
            {!userStats.isPremium ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-warning/30 bg-warning/10 text-warning text-[10px] font-black uppercase tracking-widest">
                <AlertCircle size={14} /> {userStats.postCount} / 3 Free Reports Remaining
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(8,203,0,0.2)]">
                <FaCrown /> Premium Unlimited Access
              </div>
            )}
          </div>
        </div>

        {/* Glass Form Container */}
        <div className="p-8 md:p-12 rounded-[3rem] bg-base-200/60 dark:bg-base-200/40 backdrop-blur-2xl border-2 border-base-300 dark:border-white/10 ">
          <form onSubmit={handleSubmit(handleInsertIssue)} className="space-y-8 ">
            
            {/* Title Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <Type size={14} className="text-primary" /> Issue Title
              </label>
              <input
                {...register("title", { 
                  required: "Title is required", 
                  minLength: { value: 10, message: "Provide at least 10 characters" } 
                })}
                placeholder="Briefly name the problem (e.g., Large pothole on 5th Ave)"
                className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 dark:border-white/5 focus:border-primary transition-all text-sm"
              />
              {errors.title && <p className="text-error text-[10px] font-bold px-1 uppercase tracking-tighter">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <FileText size={14} className="text-primary" /> Full Description
              </label>
              <textarea
                {...register("description", { 
                  required: "Details are required", 
                  minLength: { value: 20, message: "Please provide more detail" } 
                })}
                rows={4}
                placeholder="Describe the issue in detail to help staff understand the situation..."
                className="textarea textarea-bordered w-full rounded-2xl bg-base-100/50 border-base-300 dark:border-white/5 focus:border-primary transition-all text-sm"
              />
              {errors.description && <p className="text-error text-[10px] font-bold px-1 uppercase tracking-tighter">{errors.description.message}</p>}
            </div>

            {/* Two Column Section: Category & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Category</label>
                <select
                  {...register("category", { required: "Please select a category" })}
                  defaultValue=""
                  className="select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 dark:border-white/5"
                >
                  <option value="" disabled>Select category</option>
                  <option>Road Damage</option>
                  <option>Water Leakage</option>
                  <option>Street Lighting</option>
                  <option>Waste Management</option>
                  <option>Public Safety</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Priority Level</label>
                <select
                  {...register("priority", { required: "Priority is required" })}
                  defaultValue="Normal"
                  className="select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 dark:border-white/5 focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Normal">Normal (Free Queue)</option>
                  <option value="High">High (Boost Promotion • 100tk)</option>
                </select>
                <p className="flex items-center gap-2 text-[9px] font-bold text-primary opacity-60 px-1">
                  <FaRocket size={10} /> Paid boost guarantees faster response.
                </p>
              </div>
            </div>

            {/* Location & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                  <MapPin size={14} className="text-primary" /> Location
                </label>
                <input
                  {...register("location", { required: "Specify where the issue is" })}
                  placeholder="Street name, landmark, or area..."
                  className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 dark:border-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                  <FaImage size={14} className="text-primary" /> Proof of Issue
                </label>
                <input
                  type="file"
                  {...register("image", { required: "Evidence image is required" })}
                  className="file-input file-input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 dark:border-white/5"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              disabled={isPending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`btn btn-primary w-full h-16 rounded-2xl text-lg font-black uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(8,203,0,0.3)] ${
                isPending ? "loading" : ""
              }`}
            >
              {isPending ? "Processing Submission..." : "Dispatch Report"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default InsertIssue;