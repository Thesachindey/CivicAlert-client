import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const PaymentCanceled = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card w-full max-w-md bg-base-100 shadow-2xl p-8 text-center"
            >
                <div className="flex justify-center mb-4">
                    <FaTimesCircle className="text-6xl text-error" />
                </div>
                
                <h2 className="text-3xl font-bold text-error mb-2">Payment Canceled</h2>
                <p className="opacity-70 mb-8">
                    You canceled the transaction. No funds were deducted from your account.
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate('/dashboard/my-profile')} 
                        className="btn btn-primary w-full"
                    >
                        Try Again
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn btn-ghost w-full"
                    >
                        <FaArrowLeft /> Return Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentCanceled;