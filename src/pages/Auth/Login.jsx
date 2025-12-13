import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Logo from '../../Components/Logo';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailValue = watch('email');

  const handelLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        toast.success('Login successful!');
        navigate(location?.state || '/');
      })
      .catch((error) => {
        toast.error('Invalid email or password');
        console.log(error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex justify-center items-center relative"
    >
      {/* Glow Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 bg-base-100/90 backdrop-blur-xl
                      rounded-2xl shadow-2xl p-8 my-8 w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </h3>
          <p className='font-bold opacity-70'>Login with</p>
          <Logo />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handelLogin)}>
          <fieldset className="fieldset">

            {/* Email */}
            <label className="label">Email</label>
            <div className="relative">
              
              <input
                {...register("email", {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email'
                  }
                })}
                type="email"
                className="input w-full "
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password */}
            <label className="label mt-4">Password</label>
            <div className="relative">
             
              <input
                {...register("password", {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  },
                  validate: value => !value.includes(' ') || 'Password cannot contain spaces'
                })}
                type="password"
                className="input w-full "
                placeholder="Password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <p className="text-sm underline cursor-pointer hover:text-primary">Forgot Password?</p>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full mt-4 text-lg"
            >
              Login
            </motion.button>

            {/* Register Link */}
            <div className="text-center mt-3">
              Don’t have an account?
              <Link
                to="/register"
                state={location.state}
                className="text-primary ml-1 hover:underline"
              >
                Register
              </Link>
            </div>

            {/* Divider */}
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
      </div>
    </motion.div>
  );
};

export default Login;
