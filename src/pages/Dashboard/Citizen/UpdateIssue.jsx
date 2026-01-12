import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaImage, FaArrowLeft } from "react-icons/fa";
import { Type, FileText, MapPin, Tag, ShieldAlert } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../utils/img";
import LoadingPage from "../../LoadingPage/LoadingPage";

const UpdateIssue = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (issue) {
      reset({
        title: issue.title,
        description: issue.description,
        category: issue.category,
        priority: issue.priority,
        location: issue.location,
      });
      setPreviewImage(issue.image);
    }
  }, [issue, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (updatedData) =>
      await axiosSecure.patch(`/issues/${id}`, updatedData),
    onSuccess: () => {
      Swal.fire({
        title: "Update Successful",
        text: "The report information has been synchronized.",
        icon: "success",
        confirmButtonColor: "#08cb00",
      }).then(() => {
        navigate(`/issue-details/${id}`);
      });
    },
    onError: () => {
      toast.error("Failed to update issue");
    },
  });

  const handleUpdateIssue = async (data) => {
    try {
      let imageUrl = issue.image;

      if (data.image && data.image[0]) {
        const toastId = toast.loading("Uploading new evidence...");
        imageUrl = await imageUpload(data.image[0]);
        toast.dismiss(toastId);
      }

      const updatedIssue = {
        title: data.title.trim(),
        description: data.description.trim(),
        category: data.category,
        location: data.location.trim(),
        image: imageUrl,
      };

      await mutateAsync(updatedIssue);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4 transition-all duration-500 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[150px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <title>Update Report | Civic Alert</title>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-ghost rounded-full gap-2 border border-base-300 dark:border-white/5 hover:bg-primary/10 transition-all text-xs font-black uppercase tracking-widest"
          >
            <FaArrowLeft /> Back to Details
          </button>
          
          <div className="text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
              Update <span className="text-primary drop-shadow-[0_0_15px_rgba(8,203,0,0.2)]">Details</span>
            </h2>
            <p className="text-base-content/50 uppercase tracking-[0.2em] text-[10px] font-bold">Refining report ID: {id?.slice(-6)}</p>
          </div>
        </div>

        {/* --- MODIFIED CONTAINER: No Shadow, Clear Border --- */}
        <div className="p-8 md:p-12 rounded-[3rem] 
            bg-base-200/50 dark:bg-base-200/40 
            backdrop-blur-xl 
            border-2 border-base-300 dark:border-white/10"
            /* removed shadow-2xl */
        >
          <form onSubmit={handleSubmit(handleUpdateIssue)} className="space-y-8">
            
            {/* Title Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <Type size={14} className="text-primary" /> Issue Title
              </label>
              <input
                {...register("title", { required: "Title is required", minLength: { value: 10, message: "Provide at least 10 characters" } })}
                className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5 focus:border-primary transition-all text-sm font-medium"
              />
              {errors.title && <p className="text-error text-[10px] font-bold px-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <FileText size={14} className="text-primary" /> Full Description
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={4}
                className="textarea textarea-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5 focus:border-primary transition-all text-sm leading-relaxed"
              />
              {errors.description && <p className="text-error text-[10px] font-bold px-1">{errors.description.message}</p>}
            </div>

            {/* Category & Locked Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                   <Tag size={14} className="text-primary" /> Category
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5"
                >
                  <option>Road Damage</option>
                  <option>Water Leakage</option>
                  <option>Street Lighting</option>
                  <option>Waste Management</option>
                  <option>Public Safety</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                   <ShieldAlert size={14} className="text-primary" /> Priority Level
                </label>
                <input
                  {...register("priority")}
                  readOnly
                  className="input input-bordered w-full rounded-2xl bg-base-content/5 border-base-300 dark:border-white/5 opacity-60 cursor-not-allowed font-bold text-xs uppercase tracking-widest"
                />
                <p className="text-[9px] font-bold text-base-content/30 px-1 italic">* Priority can only be updated via the 'Boost' feature.</p>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <MapPin size={14} className="text-primary" /> Incident Location
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5"
              />
            </div>

            {/* Image Update with Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1 mb-2 block">Current Evidence</label>
                <div className="relative group overflow-hidden rounded-2xl border-2 border-base-300 dark:border-white/10">
                   <img src={previewImage} alt="Current" className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                </div>
              </div>

              <div className="md:col-span-8 space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                  <FaImage size={14} className="text-primary" /> Replace Image
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="file-input file-input-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5"
                />
                <p className="text-[9px] font-bold text-primary opacity-60 px-1">Leave empty to retain the current image.</p>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              disabled={isPending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`btn btn-primary w-full h-16 rounded-2xl text-lg font-black uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(8,203,0,0.3)] ${
                isPending ? "loading" : ""
              }`}
            >
              {isPending ? "Syncing Data..." : "Apply Changes"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateIssue;