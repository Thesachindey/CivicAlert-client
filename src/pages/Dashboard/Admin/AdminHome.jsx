import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaClipboardList, FaCheckCircle, FaTimesCircle, FaDollarSign, FaClock } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

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

    // Prepare Data for Chart
    const chartData = [
        { name: 'Pending', count: stats.pendingIssues, color: '#fbbd23' }, 
        { name: 'Resolved', count: stats.resolvedIssues, color: '#36d399' }, 
        { name: 'Rejected', count: stats.rejectedIssues, color: '#f87272' },
    ];

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen">
    <title>Admin Dashboard</title>
    
    {/* Responsive Heading */}
    <h2 className="text-2xl md:text-3xl font-bold mb-6 break-words">
        Welcome back, <span className="text-primary">{user?.displayName}</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        
        {/* Total Issues */}
        <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl p-4 md:p-6">
            <div className="stat-figure text-primary">
                <FaClipboardList className="text-2xl md:text-3xl" />
            </div>
            <div className="stat-title text-xs md:text-sm">Total Issues</div>
            <div className="stat-value text-primary text-2xl md:text-4xl">{stats.totalIssues}</div>
            <div className="stat-desc text-xs">Reports submitted</div>
        </div>

        {/* Resolved */}
        <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl p-4 md:p-6">
            <div className="stat-figure text-success">
                <FaCheckCircle className="text-2xl md:text-3xl" />
            </div>
            <div className="stat-title text-xs md:text-sm">Resolved</div>
            <div className="stat-value text-success text-2xl md:text-4xl">{stats.resolvedIssues}</div>
            <div className="stat-desc text-xs">Successfully fixed</div>
        </div>

        {/* Pending */}
        <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl p-4 md:p-6">
            <div className="stat-figure text-warning">
                <FaClock className="text-2xl md:text-3xl" />
            </div>
            <div className="stat-title text-xs md:text-sm">Pending</div>
            <div className="stat-value text-warning text-2xl md:text-4xl">{stats.pendingIssues}</div>
            <div className="stat-desc text-xs">Awaiting action</div>
        </div>

        {/* Revenue */}
        <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl p-4 md:p-6">
            <div className="stat-figure text-secondary">
                <FaBangladeshiTakaSign className="text-2xl md:text-3xl" />
            </div>
            <div className="stat-title text-xs md:text-sm">Total Revenue</div>
            <div className="stat-value text-secondary text-2xl md:text-4xl">৳{stats.totalRevenue}</div>
            <div className="stat-desc text-xs">From priority boosts</div>
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Statistics Chart */}
        <div className="card bg-base-100 shadow-xl p-4 md:p-6 border border-base-200 w-full overflow-hidden">
            <h3 className="text-lg md:text-xl font-bold mb-4">Issue Status Overview</h3>
            <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis tick={{fontSize: 12}} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Issues List Table */}
        <div className="card bg-base-100 shadow-xl p-4 md:p-6 border border-base-200">
            <h3 className="text-lg md:text-xl font-bold mb-4">Latest Reported Issues</h3>
            <div className="overflow-x-auto">
                <table className="table table-xs md:table-sm w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th className="hidden sm:table-cell">Date</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {stats.latestIssues?.map((issue, idx) => (
                            <tr key={idx}>
                                <td className="font-bold truncate max-w-[100px] md:max-w-[150px]">
                                    {issue.title}
                                    <div className="sm:hidden text-[10px] font-normal opacity-60 mt-1">
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge badge-xs md:badge-sm ${
                                        issue.status === 'Resolved' ? 'badge-success text-white' : 
                                        issue.status === 'Pending' ? 'badge-warning' : 'badge-error text-white'
                                    }`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="hidden sm:table-cell">
                                    {new Date(issue.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
    );
};

export default AdminHome;