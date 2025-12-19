import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaFileAlt, FaHourglassStart, FaTools, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
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
        { name: 'Pending', count: stats.pendingIssues || 0, color: '#fbbd23' },
        { name: 'In Progress', count: stats.inProgressIssues || 0, color: '#3abff8' },
        { name: 'Resolved', count: stats.resolvedIssues || 0, color: '#36d399' },
    ];

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen">
            
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                    My <span className="text-primary">Dashboard</span>
                </h2>
                <p className="text-base-content/60 mt-1">Welcome back, {user?.displayName}!</p>
            </div>

           {/* card for show stats  */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8">
                
                {/* Total Submitted */}
                <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-box">
                    <div className="stat-figure text-primary">
                        <FaFileAlt className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Issues</div>
                    <div className="stat-value text-primary">{stats.totalIssues || 0}</div>
                    <div className="stat-desc">Submitted by you</div>
                </div>

                {/* Pending */}
                <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-box">
                    <div className="stat-figure text-warning">
                        <FaHourglassStart className="text-3xl" />
                    </div>
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-warning">{stats.pendingIssues || 0}</div>
                    <div className="stat-desc">Waiting for approval</div>
                </div>

                {/* In Progress */}
                <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-box">
                    <div className="stat-figure text-info">
                        <FaTools className="text-3xl" />
                    </div>
                    <div className="stat-title">In Progress</div>
                    <div className="stat-value text-info">{stats.inProgressIssues || 0}</div>
                    <div className="stat-desc">Currently being fixed</div>
                </div>

                {/* Resolved */}
                <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-box">
                    <div className="stat-figure text-success">
                        <FaCheckCircle className="text-3xl" />
                    </div>
                    <div className="stat-title">Resolved</div>
                    <div className="stat-value text-success">{stats.resolvedIssues || 0}</div>
                    <div className="stat-desc">Successfully Done</div>
                </div>

                {/* Total Payments */}
                <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-box">
                    <div className="stat-figure text-secondary">
                        <FaWallet className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Spent</div>
                    <div className="stat-value text-secondary">{stats.totalPaid || 0}৳</div>
                    <div className="stat-desc">On boosts & subscriptions</div>
                </div>
            </div>

            {/* charts  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chart Card */}
                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body p-4 md:p-6">
                        <h3 className="card-title text-lg md:text-xl mb-4">Issue Status Overview</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#6B7280', fontSize: 12 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#6B7280', fontSize: 12 }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        cursor={{ fill: '#F3F4F6' }}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="card bg-gradient-to-br from-primary to-accent text-primary-content shadow-md">
                    <div className="card-body p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="card-title text-2xl mb-2">Need Help?</h3>
                        <p className="opacity-90 mb-4">
                            If your reported issue has been pending for more than 7 days, consider boosting it to <span className="font-bold">High Priority</span> for faster attention.
                        </p>
                        <div className="divider divider-neutral opacity-30 my-0"></div>
                        <ul className="list-disc list-inside space-y-2 mt-4 opacity-90 text-sm md:text-base">
                            <li>Check "My Issues" for real-time updates.</li>
                            <li>Upgrade to Premium for unlimited reporting.</li>
                            <li>Ensure your location data is accurate.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CitizenHome;