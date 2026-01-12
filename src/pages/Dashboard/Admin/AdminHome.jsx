import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import LoadingPage from '../../LoadingPage/LoadingPage';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <LoadingPage />;

    const chartData = [
        { name: 'Pending', count: stats.pendingIssues || 0, color: '#f59e0b' }, 
        { name: 'Resolved', count: stats.resolvedIssues || 0, color: '#08cb00' }, 
        { name: 'Rejected', count: stats.rejectedIssues || 0, color: '#ef4444' },
    ];

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-10"
            >
                <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    Admin <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Overview</span>
                </h2>
                <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold">
                    Welcome back, Chief Overseer <span className="text-base-content">{user?.displayName}</span>
                </p>
            </motion.div>

            {/* Stats Grid - High Visibility Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Total Issues', value: stats.totalIssues, icon: FaClipboardList, color: 'text-primary', bg: 'bg-primary/10', desc: 'Active reports' },
                    { label: 'Resolved', value: stats.resolvedIssues, icon: FaCheckCircle, color: 'text-success', bg: 'bg-success/10', desc: 'Successfully fixed' },
                    { label: 'Pending', value: stats.pendingIssues, icon: FaClock, color: 'text-warning', bg: 'bg-warning/10', desc: 'Awaiting action' },
                    { label: 'Total Revenue', value: `৳${stats.totalRevenue}`, icon: FaBangladeshiTakaSign, color: 'text-secondary', bg: 'bg-secondary/10', desc: 'From promotions' }
                ].map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-[2rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/5 shadow-lg relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-1">{stat.label}</p>
                                <h4 className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value || 0}</h4>
                            </div>
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <p className="text-[10px] text-base-content/30 mt-4 font-bold uppercase">{stat.desc}</p>
                        <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-20 ${stat.bg}`} />
                    </motion.div>
                ))}
            </div>

            {/* Content Area: Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Statistics Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-7 p-6 md:p-8 rounded-[2.5rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-xl"
                >
                    <h3 className="text-xl font-black text-base-content mb-8 uppercase tracking-tighter flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Issue Status Distribution
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 10, fontWeight: 700}} className="opacity-40 uppercase" dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 10}} className="opacity-40" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                                    cursor={{fill: 'rgba(8, 203, 0, 0.05)'}}
                                />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={45}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Latest Issues Table */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 p-6 md:p-8 rounded-[2.5rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-xl"
                >
                    <h3 className="text-xl font-black text-base-content mb-6 uppercase tracking-tighter">Latest Activities</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="text-[10px] font-black uppercase tracking-widest text-base-content/30 border-b border-base-content/5">
                                <tr>
                                    <th className="bg-transparent pl-0">Issue Title</th>
                                    <th className="bg-transparent text-right pr-0">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.latestIssues?.map((issue, idx) => (
                                    <tr key={idx} className="border-b border-base-content/5 group hover:bg-primary/5 transition-colors">
                                        <td className="bg-transparent pl-0 py-4">
                                            <div className="font-bold text-sm text-base-content/80 group-hover:text-primary transition-colors truncate max-w-[150px]">
                                                {issue.title}
                                            </div>
                                            <div className="text-[9px] opacity-40 font-mono mt-0.5">
                                                {new Date(issue.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="bg-transparent text-right pr-0">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                                issue.status === 'Resolved' ? 'bg-success/10 text-success' : 
                                                issue.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                                            }`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminHome;