import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaImage, FaEdit, FaArrowLeft } from "react-icons/fa";
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
    watch
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
        title: "Success!",
        text: "Issue updated successfully.",
        icon: "success",
        confirmButtonText: "Great",
      }).then(() => {
        navigate(`/issue-details/${id}`);
      });
    },
    onError: (err) => {
      toast.error("Failed to update issue");
    },
  });

  const handleUpdateIssue = async (data) => {
    try {
      let imageUrl = issue.image;

      if (data.image && data.image[0]) {
        const toastId = toast.loading("Uploading new image...");
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
      console.error(error);
      toast.error("Update failed");
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center py-10"
    >
      <motion.div
        className="p-8 w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl border border-base-200"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-start mb-6">
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
            <FaArrowLeft /> Back
          </button>
          <div className="text-center flex-1 pr-16">
            <h2 className="text-3xl font-bold">
              Update <span className="logo-font text-primary">Details</span>
            </h2>
            <p className="opacity-70 mt-1">Edit your report information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleUpdateIssue)}>
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

              {/* Category */}
              <div>
                <label className="label font-bold">Category</label>
                <div className="relative">
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="select select-bordered w-full"
                  >
                    <option>Road Damage</option>
                    <option>Water Leakage</option>
                    <option>Street Lighting</option>
                    <option>Waste Management</option>
                    <option>Public Safety</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="label font-bold">Priority Level</label>
                <div className="relative">
                  <input
                    {...register("priority")}
                    readOnly
                    className="input input-bordered w-full bg-base-200 cursor-not-allowed text-gray-500"
                    title="Priority cannot be changed while editing. Use Boost feature instead."
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  *Priority cannot be changed here. Use the Boost option in details.
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="label font-bold">Location</label>
              <div className="relative">
                <input
                  {...register("location", { required: "Location is required" })}
                  className="input input-bordered w-full"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.location?.message}</p>
            </div>

            {/* Image Update Section */}
            <div>
              <label className="label font-bold">Issue Image</label>

              {/* Existing Image Preview */}
              {previewImage && (
                <div className="mb-3">
                  <p className="text-xs opacity-70 mb-1">Current Image:</p>
                  <img src={previewImage} alt="Current" className="w-32 h-20 object-cover rounded-lg border" />
                </div>
              )}

              <div className="relative">
                <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="file"
                  {...register("image")}
                  className="file-input file-input-bordered w-full pl-10"
                />
              </div>
              <p className="text-xs text-info mt-1">Leave empty to keep the current photo.</p>
            </div>

            <motion.button
              disabled={isPending}
              whileHover={!isPending ? { scale: 1.03 } : {}}
              whileTap={!isPending ? { scale: 0.95 } : {}}
              className={`btn btn-primary w-full text-base-100 text-lg mt-4 ${isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isPending ? "Updating..." : "Save Changes"}
            </motion.button>
          </fieldset>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateIssue;