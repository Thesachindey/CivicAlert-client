import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaBoxOpen, FaCalendarDay } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
        { name: 'Pending', value: stats.pendingCount || 0, color: '#fbbd23' }, 
        { name: 'Resolved', value: stats.resolvedCount || 0, color: '#36d399' }, 
        { name: 'Closed', value: stats.closedCount || 0, color: '#3d4451' },   
    ];
    const activeData = chartData.filter(item => item.value > 0);
    
    if (isLoading) return <LoadingPage />;
    return (
        <div className="p-8 bg-base-100 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">
                    Work <span className="text-primary">Overview</span>
                </h2>
                <p className="opacity-60">Welcome back, {user?.displayName}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                {/* Total Assigned */}
                <div className="stat bg-white shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-primary">
                        <FaClipboardList className="text-3xl" />
                    </div>
                    <div className="stat-title">Assigned Issues</div>
                    <div className="stat-value text-primary">{stats.totalAssigned || 0}</div>
                    <div className="stat-desc">Total tasks given to you</div>
                </div>

                {/* Resolved */}
                <div className="stat bg-white shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-success">
                        <FaCheckCircle className="text-3xl" />
                    </div>
                    <div className="stat-title">Resolved</div>
                    <div className="stat-value text-success">{stats.resolvedCount || 0}</div>
                    <div className="stat-desc">Successfully fixed</div>
                </div>

                 {/* Today's Tasks */}
                 <div className="stat bg-white shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-info">
                        <FaCalendarDay className="text-3xl" />
                    </div>
                    <div className="stat-title">Current Tasks</div>
                    <div className="stat-value text-info">{stats.pendingCount || 0}</div>
                    <div className="stat-desc">Issues needing attention</div>
                </div>

                {/* Closed */}
                <div className="stat bg-white shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-neutral">
                        <FaBoxOpen className="text-3xl" />
                    </div>
                    <div className="stat-title">Closed</div>
                    <div className="stat-value text-neutral">{stats.closedCount || 0}</div>
                    <div className="stat-desc">Finalized issues</div>
                </div>
            </div>

            {/*  Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/*Distribution Chart */}
                <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
                    <h3 className="text-xl font-bold mb-4">Task Status Distribution</h3>
                    <div className="h-64 w-full">
                        {activeData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {activeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                No data available
                            </div>
                        )}
                    </div>
                </div>

                {/*Task Summary  */}
                <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl border border-blue-100 p-8">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">Today's Focus</h3>
                    
                    {stats.pendingCount > 0 ? (
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="badge badge-warning badge-lg gap-2 p-4">
                                    <FaHourglassHalf /> {stats.pendingCount} Pending
                                </div>
                                <span className="text-indigo-800 font-medium">Issues waiting for your action.</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-6">
                                Priority should be given to High Priority issues first. Check your Assigned Issues list to start working.
                            </p>
                            <Link to={'/dashboard/assigned-issues'} className="btn btn-primary btn-sm">View Pending Tasks</Link>
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center">
                            <FaCheckCircle className="text-5xl text-green-500 mb-3" />
                            <h4 className="text-xl font-bold text-gray-800">All Caught Up!</h4>
                            <p className="text-gray-500">You have no pending tasks for today. Great job!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffHome;