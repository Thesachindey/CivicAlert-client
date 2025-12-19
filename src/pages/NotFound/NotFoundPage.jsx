import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-6">
            <title>Page Not Found</title>
            {/* Animation */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <DotLottieReact
                    src="https://lottie.host/2b65181e-d911-48cf-b7a3-d9c877251ee9/eZZqQJsFCV.lottie"
                    loop
                    autoplay
                />
            </motion.div>

            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
            >
                <h1 className="text-4xl font-bold mb-3">
                    Oops! This Road Leads Nowhere 🚧
                </h1>

                <p className="text-base-content/70 max-w-lg mx-auto mb-6">
                    The page you’re trying to reach doesn’t exist or may have been moved.
                    Even <span className="font-semibold">Civic Alert</span> couldn’t track this issue.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/" className="btn btn-primary text-white btn-wide">
                        Go Back Home
                    </Link>

                    <Link onClick={() => navigate(-1)} className="btn btn-outline btn-wide">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5 rtl:rotate-180 text-lime-500'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                            />
                        </svg>

                        <span>Go back</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
