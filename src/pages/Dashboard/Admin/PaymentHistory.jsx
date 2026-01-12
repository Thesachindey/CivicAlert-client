import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaUser, FaHistory } from 'react-icons/fa';
import { FaBangladeshiTakaSign, FaFingerprint, FaShieldHalved } from 'react-icons/fa6'; 
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    if (isLoading) return <LoadingPage />;

    return (
        /* Changed min-h-screen to h-auto and removed extra top padding to fit dashboard flow */
        <div className="p-4 md:p-8 bg-base-100 transition-colors duration-500 relative">
            <title>Payment History | Civic Alert</title>
            
            {/* Background Decorative Glow - Made more subtle for LG screens */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

            {/* Header Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    Financial <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Audit</span>
                </h2>
                <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                    <FaHistory className="text-primary" /> Log of all successful transactions
                </p>
            </motion.div>

            {/* Table Container - Added max-height and custom scroll logic if data is huge */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto rounded-[2.5rem] bg-base-200/40 dark:bg-base-200/30 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-2xl mb-10"
            >
                <table className="table w-full border-separate border-spacing-y-0">
                    <thead className="bg-base-content/5 text-base-content/60 uppercase text-[10px] font-black tracking-[0.2em] sticky top-0 z-20 backdrop-blur-md">
                        <tr>
                            <th className="py-6 pl-8">Citizen Details</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Service Type</th>
                            <th>Execution Date</th>
                            <th className="pr-8 text-right">Verification</th>
                        </tr>
                    </thead>
                    <tbody className="text-base-content/80">
                        <AnimatePresence>
                            {payments.map((pay, idx) => (
                                <motion.tr 
                                    key={pay._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-primary/5 transition-colors border-b border-base-content/5 group"
                                >
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-base-content/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <FaUser size={14} />
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-base-content">{pay.name}</div>
                                                <div className="text-[10px] font-mono opacity-40 lowercase">{pay.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="font-mono text-xs opacity-60">
                                        {pay.transactionId}
                                    </td>

                                    <td className="font-black text-primary text-sm">
                                        <div className="flex items-center gap-1">
                                            <FaBangladeshiTakaSign size={12} />
                                            {pay.amount}
                                        </div>
                                    </td>

                                    <td>
                                        <div className={`badge border-none font-black text-[9px] tracking-widest p-2.5 uppercase ${
                                            pay.type === 'subscription' 
                                            ? 'bg-amber-400/10 text-amber-600' 
                                            : 'bg-info/10 text-info'
                                        }`}>
                                            {pay.type}
                                        </div>
                                    </td>

                                    <td className="text-[11px] font-bold opacity-60 uppercase tracking-tighter">
                                        {new Date(pay.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>

                                    <td className="pr-8 text-right">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 font-black text-[10px] tracking-widest">
                                            <FaShieldHalved /> PAID
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default PaymentHistory;