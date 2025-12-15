import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Logo from '../../Components/Logo';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from || '/';

  const handelLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        toast.success('Login successful!');
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error('Invalid email or password');
      });
  };

  return (
    <motion.div className="min-h-screen flex justify-center items-center">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-2xl">

        <div className="text-center flex justify-center items-center flex-col gap-2 mb-6">
          <h3 className="text-4xl font-bold">
            Welcome <span className="logo-font text-primary">Back</span>
          </h3>
          <Logo />
        </div>

        <form onSubmit={handleSubmit(handelLogin)}>

          <input
            {...register("email", { required: 'Email is required' })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            {...register("password", { required: 'Password is required' })}
            type="password"
            className="input w-full mt-3"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button className="btn btn-primary w-full mt-4">
            Login
          </button>

          <div className="divider">OR</div>
          <SocialLogin />

          <p className="text-center mt-3">
            Don’t have an account?
            <Link
              to="/register"
              state={{ from }}
              className="text-primary ml-1"
            >
              Register
            </Link>
          </p>
        </form>

      </div>
    </motion.div>
  );
};

export default Login;
