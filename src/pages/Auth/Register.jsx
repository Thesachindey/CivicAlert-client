import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

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
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const userName = watch('name');

    const handelRegistration = (data) => {
        const profileImg = data.image[0];

        registerUser(data.email, data.password)
            .then(() => {
                toast.success('Registration successful.');

                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key
                    }`;

                axios.post(image_API_URL, formData).then((res) => {
                    const photoURL = res.data.data.url;

                    const userInfo = {
                        email: data.email,
                        displayName: data.name,
                        photoURL,
                    };

                    axiosSecure.post('/users', userInfo);

                    updateUserProfile({
                        displayName: data.name,
                        photoURL,
                    }).then(() => {
                        toast.success('Profile updated successfully.');
                        navigate(location?.state || '/');
                    });
                });
            })
            .catch((error) => toast.error(error.code));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex justify-center items-center
               "
        >
            {/* Glow */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />

            {/* Card */}
            <motion.div
                className="relative z-10 bg-base-100/90 backdrop-blur-xl
                   rounded-2xl shadow-2xl p-8 w-full max-w-3xl my-8"
            >
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <h3 className="text-4xl font-bold">
                        Create an Account
                    </h3>
                    <p className="opacity-70 font-semibold">Register with</p>
                    <Logo />
                </div>

                <form onSubmit={handleSubmit(handelRegistration)}>
                    <fieldset className="fieldset">

                        {/* Name & Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="label">Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 4,
                                                message: 'Name must be at least 4 characters',
                                            },
                                            validate: (value) =>
                                                /^[A-Za-z\s]+$/.test(value) ||
                                                'Name cannot contain numbers or special characters',
                                        })}
                                        className="input w-full "
                                        placeholder="Your name"
                                    />
                                </div>
                                <p className="text-red-500 text-sm">{errors.name?.message}</p>
                            </div>

                            {/* Image */}
                            <div>
                                <label className="label">Profile Image</label>
                                <div className="relative">
                                    <input
                                        {...register('image', {
                                            required: 'Image is required',
                                            validate: {
                                                fileType: (files) =>
                                                    ['image/jpeg', 'image/png', 'image/webp'].includes(
                                                        files[0]?.type
                                                    ) || 'Only JPG, PNG or WEBP allowed',
                                                fileSize: (files) =>
                                                    files[0]?.size < 2 * 1024 * 1024 ||
                                                    'Image must be less than 2MB',
                                            },
                                        })}
                                        type="file"
                                        className="file-input w-full
                               file:bg-primary file:text-white file:border-0"
                                    />
                                </div>
                                <p className="text-red-500 text-sm">{errors.image?.message}</p>
                            </div>
                        </div>

                        {/* Email & Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Email */}
                            <div>
                                <label className="label">Email</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            validate: (value) =>
                                                value.includes('.') ||
                                                'Email must contain a valid domain',
                                        })}
                                        className="input w-full "
                                        placeholder="Email"
                                    />
                                </div>
                                <p className="text-red-500 text-sm">{errors.email?.message}</p>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="label">Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        {...register('password', {
                                            required: 'Password is required',
                                            validate: {
                                                noSpace: (value) =>
                                                    !/\s/.test(value) || 'Password cannot contain spaces',
                                                strong: (value) =>
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(
                                                        value
                                                    ) ||
                                                    'Must include uppercase, lowercase, number & symbol',
                                                noName: (value) =>
                                                    !value.toLowerCase().includes(userName?.toLowerCase()) ||
                                                    'Password cannot contain your name',
                                            },
                                        })}
                                        type="password"
                                        className="input w-full "
                                        placeholder="Password"
                                    />
                                </div>
                                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary w-full mt-6 text-lg"
                        >
                            Register
                        </motion.button>

                        <div className="text-center mt-3">
                            Already have an account?
                            <Link to="/login" className="text-primary ml-1 hover:underline">
                                Login
                            </Link>
                        </div>

                        <div className="divider">OR</div>

                        {/* Social Login */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className=""
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
