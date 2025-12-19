import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router'; // Fixed import to 'react-router-dom'
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Logo from '../../Components/Logo';

const Login = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm();

    const { signInUser, forgetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const handleLogin = async (data) => {
        setLoading(true);
        const toastId = toast.loading('Logging in...');

        try {
            await signInUser(data.email, data.password);
            toast.success('Welcome back!', { id: toastId });
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Invalid email or password.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };


    const handleForgetPassword = async () => {
        const email = emailRef.current.value;
        if (!email) {
            return toast.error("Please provide an email address.");
        }
        //validation
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            return toast.error("Please provide a valid email address.");
        }

        try {
            await forgetPassword(email);
            toast.success("Password reset email sent! Check your inbox.");
            document.getElementById('forget_pass_modal').close();
        } catch (error) {
            console.error(error);
            toast.error("Failed to send reset email. Check if the email is correct.");
        }
    };

    const openForgetPasswordModal = () => {
        const loginEmail = getValues("email");
        if (loginEmail && emailRef.current) {
            emailRef.current.value = loginEmail;
        }
        document.getElementById('forget_pass_modal').showModal();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen  flex justify-center items-center bg-base-100 relative"
        >
            <title>Login</title>
            {/* Glow Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />

            {/* Card */}
            <motion.div
                className="relative z-10 bg-base-100/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                <div className="text-center flex justify-center items-center flex-col gap-2 mb-8">
                    <h3 className="text-3xl font-bold">
                        Welcome <span className="text-primary">Back</span>
                    </h3>
                    <div className="scale-90"><Logo /></div>
                    <p className="opacity-60 text-sm">Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)}>

                    {/* Email Input */}
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Email</span></label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                            <input
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    {/* Password Input */}
                    <div className="form-control mb-6">
                        <label className="label"><span className="label-text">Password</span></label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                            <input
                                {...register("password", { required: 'Password is required' })}
                                type="password"
                                className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`}
                                placeholder="Enter your password"
                            />
                        </div>
                        <label className="label">
                            {errors.password ? (
                                <span className="text-error text-xs">{errors.password.message}</span>
                            ) : <span />}

                            {/* Forgot Password Trigger */}
                            <span
                                onClick={openForgetPasswordModal}
                                className="label-text-alt link link-hover cursor-pointer text-primary"
                            >
                                Forgot password?
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        className="btn btn-primary w-full text-lg shadow-lg"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <FaSpinner className="animate-spin" /> Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </motion.button>

                    <div className="divider my-6">OR</div>
                    <SocialLogin />

                    <p className="text-center mt-6 text-sm">
                        Don’t have an account?
                        <Link
                            to="/register"
                            state={{ from: location.state?.from }}
                            className="text-primary font-bold ml-1 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </motion.div>

            {/* modal for forgot pass  */}
            <dialog id="forget_pass_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Reset Password</h3>
                    <p className="py-2 text-sm opacity-70 mb-4">Enter your email address to receive a password reset link.</p>

                    <div className="form-control">
                        <label className="label font-bold">Email Address</label>
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Type your email here..."
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="modal-action">
                        <button
                            className="btn btn-ghost"
                            onClick={() => document.getElementById('forget_pass_modal').close()}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleForgetPassword}
                        >
                            Send Reset Link
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </motion.div>
    );
};

export default Login;