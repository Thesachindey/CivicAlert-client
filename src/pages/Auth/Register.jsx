import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaImage, FaSpinner } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Logo from '../../Components/Logo';




const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { registerUser, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false); // Added loading state
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const userName = watch('name');
    //----------------------------------------------------------
    const handleRegistration = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Creating account...");

        try {
            await registerUser(data.email, data.password);

            const imageFile = { image: data.image[0] };
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

            const res = await axios.post(image_API_URL, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const photoURL = res.data.data.url;


                await updateUserProfile({
                    displayName: data.name,
                    photoURL: photoURL
                });

                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: photoURL,
                };
                await axiosSecure.post('/users', userInfo);

                toast.success('Registration successful.', { id: toastId });
                navigate(location?.state || '/dashboard/my-profile');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Registration failed", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex justify-center items-center bg-base-100"
        >
            <title>Register</title>
            {/* Glow Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />

            {/* Card */}
            <motion.div
                className="relative z-10 bg-base-100/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-3xl my-8"
            >
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <h3 className="text-4xl font-bold">Create an <span className='logo-font text-primary'>Account</span></h3>
                    <p className="opacity-70 font-semibold mt-2">Register with</p>
                    <div className="mt-2 scale-75"><Logo /></div>
                </div>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset p-0">
                        {/* Name & Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Name</span></label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: { value: 4, message: 'Name must be at least 4 characters' },
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: 'Name cannot contain numbers or special characters'
                                            }
                                        })}
                                        className={`input input-bordered w-full pl-10 ${errors.name ? 'input-error' : ''}`}
                                        placeholder="Your name"
                                    />
                                </div>
                                <p className="text-error text-xs mt-1">{errors.name?.message}</p>
                            </div>

                            {/* Image */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Profile Image</span></label>
                                <div className="relative">
                                    <input
                                        {...register('image', {
                                            required: 'Image is required',
                                            validate: {
                                                fileType: (files) =>
                                                    ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type) || 'Only JPG, PNG or WEBP allowed',
                                                fileSize: (files) =>
                                                    files[0]?.size < 2 * 1024 * 1024 || 'Image must be less than 2MB',
                                            }
                                        })}
                                        type="file"
                                        className="file-input file-input-bordered file-input-primary w-full"
                                    />
                                </div>
                                <p className="text-error text-xs mt-1">{errors.image?.message}</p>
                            </div>
                        </div>

                        {/* Email & Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Email</span></label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                                        placeholder="Email"
                                    />
                                </div>
                                <p className="text-error text-xs mt-1">{errors.email?.message}</p>
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Password</span></label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        {...register('password', {
                                            required: 'Password is required',
                                            validate: {
                                                noSpace: (value) => !/\s/.test(value) || 'Password cannot contain spaces',
                                                strong: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value) || 'Must include uppercase, lowercase, number & symbol',
                                                noName: (value) => {
                                                    // Safety check: only check if userName exists
                                                    if (!userName) return true;
                                                    return !value.toLowerCase().includes(userName.toLowerCase()) || 'Password cannot contain your name';
                                                }
                                            }
                                        })}
                                        type="password"
                                        className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`}
                                        placeholder="Password"
                                    />
                                </div>
                                <p className="text-error text-xs mt-1">{errors.password?.message}</p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className="btn btn-primary w-full mt-8 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <FaSpinner className="animate-spin" /> Processing...
                                </span>
                            ) : (
                                "Register"
                            )}
                        </motion.button>

                        <div className="text-center mt-4">
                            Already have an account?
                            <Link to="/login" className="text-primary ml-1 hover:underline font-bold">
                                Login
                            </Link>
                        </div>

                        <div className="divider my-6">OR</div>

                        {/* Social Login */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <SocialLogin />
                        </motion.div>
                    </fieldset>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Register;