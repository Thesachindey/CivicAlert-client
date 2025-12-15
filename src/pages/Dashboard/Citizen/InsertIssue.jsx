import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

import {
  FaHeading,
  FaListAlt,
  FaMapMarkerAlt,
  FaImage,
  FaExclamationTriangle,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../utils/img";




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

 //query
  const {
    mutateAsync,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (issueData) =>
      await axiosSecure.post("/issues", issueData),

    onSuccess: () => {
      toast.success("Issue submitted successfully");
      reset();
      navigate("/all-issues");
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

 //submit fun
  const handleInsertIssue = async (data) => {
    if (!user) {
      return toast.error("Please login to submit an issue");
    }

    const confirm = await Swal.fire({
      title: "Submit Issue?",
      text: "Are you sure you want to report this issue?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Image Upload Util
      const imageUrl = await imageUpload(data.image[0]);

      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        location: data.location,
        image: imageUrl,
        status: "Pending",
        upvotes: 0,
        createdBy: user.email,
        createdAt: new Date(),
      };

      await mutateAsync(issueData);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Something went wrong!
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center"
    >
      <motion.div
        className="p-8 w-full max-w-3xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">
            Report an <span className="logo-font text-primary">Issue</span>
          </h2>
          <p className="opacity-70 mt-1">
            Help improve public infrastructure
          </p>
        </div>

        <form onSubmit={handleSubmit(handleInsertIssue)}>
          <fieldset className="fieldset space-y-6">

            {/* Title */}
            <div>
              <label className="label">Issue Title</label>
              <div className="relative">
                <FaHeading className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                  className="input w-full pl-10"
                  placeholder="Broken street light near school"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Min 20 characters" },
                })}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
              <p className="text-red-500 text-sm">
                {errors.description?.message}
              </p>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Category */}
              <div>
                <label className="label">Category</label>
                <div className="relative">
                  <FaListAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="select select-bordered w-full pl-10"
                    defaultValue=""
                  >
                    <option value="" disabled>Select category</option>
                    <option>Road Damage</option>
                    <option>Water Leakage</option>
                    <option>Street Lighting</option>
                    <option>Waste Management</option>
                    <option>Public Safety</option>
                    <option>Footpath Damage</option>
                    <option>Garbage Overflow</option>
                    <option>Drainage Problem</option>
                    <option>Other</option>
                  </select>
                </div>
                <p className="text-red-500 text-sm">
                  {errors.category?.message}
                </p>
              </div>

              {/* Priority */}
              <div>
                <label className="label">Priority</label>
                <div className="relative">
                  <FaExclamationTriangle className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className="select select-bordered w-full pl-10"
                    defaultValue=""
                  >
                    <option value="" disabled>Select priority</option>
                    <option>High</option>
                    <option>Normal</option>
                  </select>
                </div>
                <p className="text-red-500 text-sm">
                  {errors.priority?.message}
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="label">Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="input w-full pl-10"
                  placeholder="Dhanmondi 32, Dhaka"
                />
              </div>
              <p className="text-red-500 text-sm">
                {errors.location?.message}
              </p>
            </div>

            {/* Image */}
            <div>
              <label className="label">Issue Image</label>
              <div className="relative">
                <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="file"
                  {...register("image", {
                    required: "Image is required",
                    validate: {
                      fileType: (files) =>
                        ["image/jpeg", "image/png", "image/webp"].includes(
                          files[0]?.type
                        ) || "Only JPG, PNG or WEBP allowed",
                      fileSize: (files) =>
                        files[0]?.size < 2 * 1024 * 1024 ||
                        "Image must be less than 2MB",
                    },
                  })}
                  className="file-input w-full pl-10"
                />
              </div>
              <p className="text-red-500 text-sm">
                {errors.image?.message}
              </p>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full text-lg mt-4"
            >
              {isPending ? "Submitting..." : "Submit Issue"}
            </motion.button>

          </fieldset>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default InsertIssue;
