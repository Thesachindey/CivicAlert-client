import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaClipboardList, FaCheckCircle, FaTimesCircle, FaDollarSign, FaClock } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
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

    // Prepare Data for Chart
    const chartData = [
        { name: 'Pending', count: stats.pendingIssues, color: '#fbbd23' }, 
        { name: 'Resolved', count: stats.resolvedIssues, color: '#36d399' }, 
        { name: 'Rejected', count: stats.rejectedIssues, color: '#f87272' },
    ];

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">
                Welcome back, <span className="text-primary">{user?.displayName}</span>
            </h2>

            {/* stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                {/* Total Issues */}
                <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl">
                    <div className="stat-figure text-primary">
                        <FaClipboardList className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Issues</div>
                    <div className="stat-value text-primary">{stats.totalIssues}</div>
                    <div className="stat-desc">Reports submitted</div>
                </div>

                {/* Resolved */}
                <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl">
                    <div className="stat-figure text-success">
                        <FaCheckCircle className="text-3xl" />
                    </div>
                    <div className="stat-title">Resolved</div>
                    <div className="stat-value text-success">{stats.resolvedIssues}</div>
                    <div className="stat-desc">Successfully fixed</div>
                </div>

                {/* Pending */}
                <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl">
                    <div className="stat-figure text-warning">
                        <FaClock className="text-3xl" />
                    </div>
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-warning">{stats.pendingIssues}</div>
                    <div className="stat-desc">Awaiting action</div>
                </div>

                {/* Revenue */}
                <div className="stat bg-base-100 shadow-xl border border-base-200 rounded-2xl">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-secondary">${stats.totalRevenue}</div>
                    <div className="stat-desc">From priority boosts</div>
                </div>
            </div>

            {/* chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/*Statistics Chart */}
                <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
                    <h3 className="text-xl font-bold mb-4">Issue Status Overview</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
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

                {/*  Issues List */}
                <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
                    <h3 className="text-xl font-bold mb-4">Latest Reported Issues</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.latestIssues?.map((issue, idx) => (
                                    <tr key={idx}>
                                        <td className="font-bold truncate max-w-[150px]">{issue.title}</td>
                                        <td>
                                            <span className={`badge badge-xs ${
                                                issue.status === 'Resolved' ? 'badge-success' : 
                                                issue.status === 'Pending' ? 'badge-warning' : 'badge-error'
                                            }`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
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