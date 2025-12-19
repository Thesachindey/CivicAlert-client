import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaSpinner, FaHome, FaListAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const verifyPayment = async () => {
            if (!sessionId) {
                setStatus('error');
                setLoading(false);
                return;
            }

            try {
                const res = await axiosSecure.post('/payment-success', { sessionId });
                
                if (isMounted) {
                    if (res.data.success) {
                        setStatus('success');
                    } else {
                           setStatus(res.data.message === "Already processed" ? 'success' : 'error');
                    }
                }
            } catch (error) {
                console.error(error);
                if (isMounted) setStatus('error');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        verifyPayment();

        return () => { isMounted = false; };
    }, [sessionId, axiosSecure]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 gap-4">
                <FaSpinner className="animate-spin text-4xl text-primary" />
                <h2 className="text-xl font-semibold">Verifying Payment...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 relative overflow-hidden">
 
            {status === 'success' && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card w-full max-w-md bg-base-100 shadow-2xl p-8 text-center z-10"
            >
                {status === 'success' ? (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <FaCheckCircle className="text-6xl text-success" />
                        </div>
                        
                        <div>
                            <h2 className="text-3xl font-bold text-success">Payment Successful!</h2>
                            <p className="py-2 opacity-70">
                                Thank you! Your transaction has been completed.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button onClick={() => navigate('/dashboard/my-profile')} className="btn btn-primary w-full">
                                <FaHome /> Go to Profile
                            </button>
                            <button onClick={() => navigate('/dashboard/my-issues')} className="btn btn-outline w-full">
                                <FaListAlt /> My issues
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-error text-6xl flex justify-center">⚠️</div>
                        <h2 className="text-3xl font-bold text-error">Payment Failed</h2>
                        <p className="opacity-70">We couldn't verify your payment. Please contact support.</p>
                        <button onClick={() => navigate('/')} className="btn btn-primary w-full">
                            Return Home
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;