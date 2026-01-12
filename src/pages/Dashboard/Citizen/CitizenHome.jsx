import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFileAlt, FaHourglassStart, FaTools, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const CitizenHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['citizen-stats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/citizen-stats/${user.email}`);
            return res.data;
        }
    });

    const chartData = [
        { name: 'Pending', count: stats.pendingIssues || 0, color: '#f59e0b' }, // Amber-500
        { name: 'In Progress', count: stats.inProgressIssues || 0, color: '#3b82f6' }, // Blue-500
        { name: 'Resolved', count: stats.resolvedIssues || 0, color: '#08cb00' }, // Your Primary Emerald
    ];

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-10"
            >
                <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    My <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Dashboard</span>
                </h2>
                <p className="text-base-content/50 mt-1 font-light uppercase tracking-widest text-xs">
                    Welcome back, <span className="text-base-content font-bold">{user?.displayName}</span>
                </p>
            </motion.div>

            {/* Stats Grid - High Visibility Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Total Issues', value: stats.totalIssues, icon: FaFileAlt, color: 'text-primary', bg: 'bg-primary/10', desc: 'Submitted by you' },
                    { label: 'Pending', value: stats.pendingIssues, icon: FaHourglassStart, color: 'text-warning', bg: 'bg-warning/10', desc: 'Awaiting review' },
                    { label: 'In Progress', value: stats.inProgressIssues, icon: FaTools, color: 'text-info', bg: 'bg-info/10', desc: 'Maintenance active' },
                    { label: 'Resolved', value: stats.resolvedIssues, icon: FaCheckCircle, color: 'text-success', bg: 'bg-success/10', desc: 'Fixed & Closed' }
                ].map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative group p-6 rounded-[2rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/5 overflow-hidden transition-all hover:border-primary/30"
                    >
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-1">{stat.label}</p>
                                <h4 className={`text-3xl font-black ${stat.color}`}>{stat.value || 0}</h4>
                            </div>
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <p className="text-[10px] text-base-content/30 mt-4 font-bold uppercase">{stat.desc}</p>
                        {/* Internal Glow Effect */}
                        <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${stat.bg}`} />
                    </motion.div>
                ))}
            </div>

            {/* Content Area: Chart & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Chart Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-7 p-8 rounded-[2.5rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/5 shadow-2xl"
                >
                    <h3 className="text-xl font-black text-base-content mb-8 uppercase tracking-tighter flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Status Overview
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-5" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700 }} 
                                    className="opacity-40 uppercase"
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'currentColor', fontSize: 10 }}
                                    className="opacity-40"
                                    allowDecimals={false}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                    cursor={{ fill: 'rgba(8, 203, 0, 0.05)' }}
                                />
                                <Bar dataKey="count" radius={[8, 8, 8, 8]} barSize={50}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Info Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 p-8 rounded-[2.5rem] bg-primary text-primary-content shadow-[0_20px_40px_rgba(8,203,0,0.2)] overflow-hidden relative"
                >
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4 leading-tight">Civic <br/> Priority.</h3>
                        <p className="text-primary-content/80 mb-8 font-light leading-relaxed">
                            Pending for more than 7 days? Consider <span className="font-bold underline">boosting</span> your report to fast-track it to city authorities.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                'Real-time status tracking',
                                'Direct staff communication',
                                'Boost priority options',
                                'Accurate location analytics'
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-90">
                                    <FaCheckCircle className="text-white" /> {text}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <FaWallet className="absolute -bottom-10 -right-10 text-[15rem] opacity-10 rotate-12" />
                </motion.div>
            </div>
        </div>
    );
};

export default CitizenHome;