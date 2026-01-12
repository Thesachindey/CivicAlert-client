import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; // FIXED IMPORT
import toast from "react-hot-toast";
import { FaUserEdit, FaImage } from "react-icons/fa";
import { Type, ArrowLeft } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

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
    <div className="py-10 px-4 min-h-screen bg-base-100 flex items-center justify-center relative overflow-hidden transition-colors duration-500">
      <title>Update Profile | Civic Alert</title>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[150px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-[3rem] bg-base-200/80 dark:bg-base-200/40 backdrop-blur-2xl border-2 border-base-300 dark:border-white/10"
      >
        <div className="p-8 md:p-10">
          
          <div className="flex flex-col items-center text-center mb-10 space-y-4">
            <button 
              onClick={() => navigate(-1)} 
              className="self-start btn btn-ghost btn-xs rounded-full gap-2 opacity-50 hover:opacity-100"
            >
              <ArrowLeft size={14} /> Back
            </button>
            
            <div className="relative">
              <div className="bg-primary/10 text-primary p-5 rounded-3xl shadow-lg shadow-primary/5">
                <FaUserEdit size={32} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-4 border-base-200 animate-pulse" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-base-content tracking-tight">
                Update <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Profile</span>
              </h2>
              <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.2em] mt-1">
                Refine your identity on Civic Alert
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <Type size={14} className="text-primary" /> Full Name
              </label>
              <input
                className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5 focus:border-primary transition-all font-medium"
                placeholder="Enter your public name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 5, message: "Minimum 5 characters" },
                })}
              />
              {errors.name && <p className="text-error text-[10px] font-bold px-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                <FaImage size={14} className="text-primary" /> Profile Avatar
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full rounded-2xl bg-base-100 border-base-300 dark:border-white/5"
                {...register("image", {
                  required: "Image is required",
                  validate: {
                    fileType: (files) =>
                      ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type) || "Only JPG, PNG, WEBP allowed",
                    fileSize: (files) =>
                      files[0]?.size < 2 * 1024 * 1024 || "Image must be under 2MB",
                  },
                })}
                onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
              />
              {errors.image && <p className="text-error text-[10px] font-bold px-1">{errors.image.message}</p>}
            </div>

            {/* THIS IS THE COMPONENT THAT WAS CAUSING THE ERROR */}
            <AnimatePresence>
              {preview && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-2"
                >
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">Live Preview</p>
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-[2rem] ring-4 ring-primary/20 ring-offset-4 ring-offset-base-100 overflow-hidden shadow-2xl">
                      <img src={preview} alt="Profile Preview" className="object-cover" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary w-full h-16 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 mt-4"
            >
              Sync Profile
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateInfo;