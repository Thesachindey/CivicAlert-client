import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaImage, FaCrown, FaRocket } from "react-icons/fa";
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
    mutationFn: async (issueData) =>
      await axiosSecure.post("/issues", issueData),
    onSuccess: () => {
      toast.success("Issue reported successfully!");
      reset();
      navigate("/dashboard/my-issues");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit issue");
    },
  });

  const handleInsertIssue = async (data) => {
    if (!user) return toast.error("Please login to submit an issue");

    if (!userStats.isPremium && userStats.postCount >= 3) {
      Swal.fire({
        icon: 'error',
        title: 'Limit Reached',
        text: 'Free users can only report 3 issues. Please upgrade to Premium!',
        confirmButtonText: 'Upgrade Now',
        showCancelButton: true
      }).then((res) => {
        if (res.isConfirmed) navigate('/dashboard/my-profile');
      });
      return;
    }

    if (data.priority === "High") {

      const confirmPay = await Swal.fire({
        title: "High Priority Required",
        text: "This requires a 100tk fee. You will be redirected to Stripe to pay.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Proceed to Payment",
        cancelButtonText: "Switch to Normal",
      });

      if (confirmPay.isConfirmed) {
        const toastId = toast.loading("Uploading image & Connecting to Stripe...");

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
            toast.success("Redirecting...", { id: toastId });
            window.location.href = res.data.url;
          } else {
            toast.error("Failed to get payment URL", { id: toastId });
          }

        } catch (err) {
          console.error(err);
          toast.error("Error initiating payment", { id: toastId });
        }
      }
      return;
    }

    const confirm = await Swal.fire({
      title: "Submit Report?",
      text: "Are you sure you want to report this issue?",
      icon: "question",
      showCancelButton: true,
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
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  if (statsLoading) return <LoadingPage />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center py-10"
    >
      <title>Insert Issue</title>
      {/* Form Container */}
      <motion.div
        className="p-8 w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">
            Report an <span className="logo-font text-primary">Issue</span>
          </h2>
          <p className="opacity-70 mt-1">Help improve public infrastructure</p>

          {/* premium feature  */}
          {!userStats.isPremium && (
            <div className="badge badge-warning gap-2 mt-3 p-3">
              {userStats.postCount}/3 Free Reports Used
            </div>
          )}
          {userStats.isPremium && (
            <div className="badge badge-success text-white gap-2 mt-3 p-3">
              <FaCrown /> Premium Unlimited Access
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(handleInsertIssue)}>
          <fieldset className="fieldset space-y-6">

            {/* Title */}
            <div>
              <label className="label font-bold">Issue Title</label>
              <div className="relative">
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                  className="input input-bordered w-full"
                  placeholder="Issue title"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            {/* Description */}
            <div>
              <label className="label font-bold">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Min 20 characters" },
                })}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
              <p className="text-red-500 text-sm">{errors.description?.message}</p>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="label font-bold">Category</label>
                <div className="relative">
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="select select-bordered w-full"
                    defaultValue=""
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
                <p className="text-red-500 text-sm">{errors.category?.message}</p>
              </div>

              <div>
                <label className="label font-bold">Priority Level</label>
                <div className="relative">
                  <select
                    {...register("priority", { required: "Priority is required" })}
                    className="select select-bordered w-full"
                    defaultValue="Normal"
                  >
                    <option value="Normal">Normal (Free)</option>
                    <option value="High">High (Paid Promotion)</option>
                  </select>
                </div>
                <p className="text-xs text-info mt-1 flex items-center gap-1">
                  <FaRocket /> High priority issues require a small fee.
                </p>
                <p className="text-red-500 text-sm">{errors.priority?.message}</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="label font-bold">Location</label>
              <div className="relative">
                <input
                  {...register("location", { required: "Location is required" })}
                  className="input input-bordered w-full"
                  placeholder="Location"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.location?.message}</p>
            </div>

            {/* Image */}
            <div>
              <label className="label font-bold">Issue Image</label>
              <div className="relative">
                <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  className="file-input file-input-bordered w-full pl-10"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.image?.message}</p>
            </div>

            <motion.button
              disabled={isPending}
              whileHover={!isPending ? { scale: 1.03 } : {}}
              whileTap={!isPending ? { scale: 0.95 } : {}}
              className={`btn btn-primary w-full text-base-100 text-lg mt-4 ${isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isPending ? "Processing..." : "Submit Report"}
            </motion.button>
          </fieldset>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default InsertIssue;