import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { FaUserEdit } from "react-icons/fa";

const UpdateInfo = () => {
  const { updateUserProfile, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const imageFile = data.image[0];

    try {
      const photoURL = URL.createObjectURL(imageFile);

      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      setUser((prev) => ({
        ...prev,
        displayName: name,
        photoURL,
      }));

      toast.success("Profile updated successfully");
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error("Update profile failed");
    }
  };

  return (
    <div className="py-10">

    <div className="min-h-screen flex items-center justify-center bg-base-200 rounded-3xl px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-300">

        {/* Header */}
        <div className="text-center pt-8 px-6 space-y-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 text-primary p-4 rounded-full">
              <FaUserEdit size={28} />
            </div>
          </div>

          <h2 className="logo-font text-2xl font-semibold">
            Update Your Profile
          </h2>
          <p className="text-sm text-base-content/60">
            Keep your Civic Alert account accurate and up to date
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-6 space-y-4">

          {/* Name */}
          <div>
            <label className="label font-medium">Full Name</label>
            <input
              className="input input-bordered w-full"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters",
                },
              })}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.name?.message}
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="label font-medium">Profile Image</label>
            <input
              type="file"
              className="file-input w-full
                file:bg-primary file:text-white file:border-0"
              {...register("image", {
                required: "Image is required",
                validate: {
                  fileType: (files) =>
                    ["image/jpeg", "image/png", "image/webp"].includes(
                      files[0]?.type
                    ) || "Only JPG, PNG, WEBP allowed",
                  fileSize: (files) =>
                    files[0]?.size < 2 * 1024 * 1024 ||
                    "Image must be under 2MB",
                },
              })}
              onChange={(e) =>
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.image?.message}
            </p>
          </div>

          {/* Preview of uploaded img */}
          {preview && (
            <div className="flex justify-center pt-3">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-primary ring-offset-2">
                  <img src={preview} alt="Profile Preview" />
                </div>
              </div>
            </div>
          )}

          {/* Button */}
          <button className="btn w-full bg-primary text-white hover:bg-primary/90 mt-4">
            Save Changes
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateInfo;
