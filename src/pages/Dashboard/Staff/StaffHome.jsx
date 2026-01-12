import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaBoxOpen, FaCalendarDay } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { Link } from 'react-router';

const StaffHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['staff-stats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff-stats/${user.email}`);
            return res.data;
        }
    });

    const chartData = [
        { name: 'Pending', value: stats.pendingCount || 0, color: '#f59e0b' }, 
        { name: 'Resolved', value: stats.resolvedCount || 0, color: '#08cb00' }, 
        { name: 'Closed', value: stats.closedCount || 0, color: '#6b7280' },   
    ];
    
    const activeData = chartData.filter(item => item.value > 0);
    
    if (isLoading) return <LoadingPage />;

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
                    Work <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Overview</span>
                </h2>
                <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold">
                    Official Personnel: <span className="text-base-content font-bold">{user?.displayName}</span>
                </p>
            </motion.div>

            {/* Stats Grid - High Visibility Glass with Hover Glow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Assigned', value: stats.totalAssigned, icon: FaClipboardList, color: 'text-primary', bg: 'bg-primary/10', desc: 'Total tasks' },
                    { label: 'Resolved', value: stats.resolvedCount, icon: FaCheckCircle, color: 'text-success', bg: 'bg-success/10', desc: 'Fixed & Verified' },
                    { label: 'Current Tasks', value: stats.pendingCount, icon: FaCalendarDay, color: 'text-info', bg: 'bg-info/10', desc: 'Awaiting action' },
                    { label: 'Closed', value: stats.closedCount, icon: FaBoxOpen, color: 'text-neutral-content', bg: 'bg-neutral/20', desc: 'Finalized cases' }
                ].map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        // Added hover:shadow-primary/20, hover:border-primary/30, hover:-translate-y-1, transition-all, duration-300
                        className="p-6 rounded-[2rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/5 shadow-lg relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
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

            {/* Content Area: Charts & Focus */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Distribution Chart Card with Hover Glow */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    // Added hover:shadow-primary/20, hover:border-primary/30, transition-all, duration-300
                    className="lg:col-span-7 p-6 md:p-8 rounded-[2.5rem] bg-base-200/50 dark:bg-base-200/40 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300"
                >
                    <h3 className="text-xl font-black text-base-content mb-8 uppercase tracking-tighter flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Task Distribution
                    </h3>
                    <div className="h-72 w-full">
                        {activeData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {activeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px'}}/>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-base-content/20 font-black uppercase tracking-widest italic">
                                No Work Data Available
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Today's Focus Section with Dynamic Hover Glow */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    // Added dynamic hover classes based on state + transition properties
                    className={`lg:col-span-5 p-8 rounded-[3rem] relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl ${
                        stats.pendingCount > 0 
                        ? 'bg-warning/5 border-warning/20 hover:border-warning/50 hover:shadow-warning/20' 
                        : 'bg-primary/5 border-primary/20 hover:border-primary/50 hover:shadow-primary/20'
                    }`}
                >
                    <h3 className="text-2xl font-black text-base-content mb-4 tracking-tighter">Today's <br/> Priority.</h3>
                    
                    {stats.pendingCount > 0 ? (
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning text-warning-content font-black text-[10px] tracking-widest uppercase shadow-lg shadow-warning/20">
                                <FaHourglassHalf className="animate-spin-slow" /> {stats.pendingCount} Pending Reports
                            </div>
                            
                            <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                                Critical infrastructure reports are waiting for your verification. High Priority cases should be addressed immediately.
                            </p>
                            
                            <Link 
                                to={'/dashboard/assigned-issues'} 
                                className="btn btn-warning w-full rounded-2xl font-black tracking-[0.2em] text-xs h-14 shadow-lg shadow-warning/20 hover:shadow-warning/40"
                            >
                                Dispatch Field Check
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center h-full pt-4">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 animate-bounce">
                                <FaCheckCircle size={40} />
                            </div>
                            <h4 className="text-xl font-black text-base-content uppercase tracking-tighter">Operational Clearance</h4>
                            <p className="text-[11px] text-base-content/40 font-bold uppercase tracking-widest mt-2">All tasks synchronized and caught up.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default StaffHome;