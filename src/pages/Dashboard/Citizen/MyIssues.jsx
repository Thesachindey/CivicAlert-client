import React, { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const MyIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [filterStatus, setFilterStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['my-issues', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-issues/${user.email}`);
            return res.data;
        }
    });

    const { mutateAsync: deleteIssue } = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/issues/${id}`),
        onSuccess: () => {
            Swal.fire({
                title: 'Deleted!',
                text: 'Your report has been removed.',
                icon: 'success',
                confirmButtonColor: '#08cb00'
            });
            queryClient.invalidateQueries(['my-issues']);
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Remove Report?',
            text: "This will permanently delete your submission.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#08cb00',
            confirmButtonText: 'Yes, delete it!',
            background: 'var(--bg-base-200)',
            color: 'var(--text-base-content)'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteIssue(id);
            }
        });
    };

    const filteredIssues = issues.filter(issue => {
        const matchesStatus = filterStatus ? issue.status === filterStatus : true;
        const matchesCategory = filterCategory ? issue.category === filterCategory : true;
        return matchesStatus && matchesCategory;
    });

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen relative overflow-hidden transition-colors duration-500">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header & Filter Controls */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content">
                        My <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Reports</span>
                    </h2>
                    <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold">
                        Tracking {filteredIssues.length} active submissions
                    </p>
                </motion.div>

                {/* Glass Filter Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-3 p-3 rounded-3xl bg-base-200/50 backdrop-blur-md border border-base-300 dark:border-white/5  w-full md:w-auto"
                >
                    <div className="flex items-center gap-2 px-3 text-primary">
                        <FaFilter size={14} />
                    </div>
                    <select 
                        className="select select-sm bg-base-100/50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                        onChange={(e) => setFilterStatus(e.target.value)}
                        value={filterStatus}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <select 
                        className="select select-sm bg-base-100/50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                        onChange={(e) => setFilterCategory(e.target.value)}
                        value={filterCategory}
                    >
                        <option value="">All Categories</option>
                        <option value="Road Damage">Road Damage</option>
                        <option value="Water Leakage">Water Leakage</option>
                        <option value="Street Lighting">Street Lighting</option>
                        <option value="Public Safety">Public Safety</option>
                    </select>
                </motion.div>
            </div>

            {/* Submissions Table - Ultra Glass */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto rounded-[2.5rem] bg-base-200/40 dark:bg-base-200/30 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 "
            >
                <table className="table w-full">
                    <thead className="bg-base-content/5 text-base-content/60 uppercase text-[10px] font-black tracking-[0.2em]">
                        <tr>
                            <th className="py-6 pl-8">Incident Details</th>
                            <th>Category</th>
                            <th>Reported Date</th>
                            <th>Current Status</th>
                            <th className="text-center pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-base-content/80">
                        <AnimatePresence>
                            {filteredIssues.map((issue, idx) => (
                                <motion.tr 
                                    key={issue._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-primary/5 transition-colors border-b border-base-content/5 group"
                                >
                                    <td className="pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                                    <img src={issue.image} alt="Issue" className="object-cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm line-clamp-1 max-w-[200px]">{issue.title}</div>
                                                <div className="text-[10px] flex items-center gap-2 mt-1">
                                                    {issue.priority === 'High' ? (
                                                        <span className="text-red-500 flex items-center gap-1 font-bold italic animate-pulse">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> High Priority
                                                        </span>
                                                    ) : (
                                                        <span className="opacity-40 font-bold">Standard Priority</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="px-3 py-1 rounded-lg bg-base-content/5 text-[10px] font-black uppercase tracking-wider border border-base-content/5">
                                            {issue.category}
                                        </span>
                                    </td>

                                    <td className="text-xs font-mono opacity-60">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-primary/50" />
                                            {new Date(issue.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>

                                    <td>
                                        <div className={`
                                            px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border-2
                                            ${issue.status === 'Resolved' ? 'border-primary/40 text-primary bg-primary/10 shadow-[0_0_15px_rgba(8,203,0,0.2)]' : 
                                              issue.status === 'In Progress' ? 'border-info/40 text-info bg-info/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 
                                              'border-warning/40 text-warning bg-warning/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]'}
                                        `}>
                                            {issue.status}
                                        </div>
                                    </td>

                                    <td className="pr-8">
                                        <div className="flex justify-center items-center gap-2">
                                            <Link 
                                                to={`/issue-details/${issue._id}`}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5"
                                            >
                                                <FaEye size={16} />
                                            </Link>

                                            {issue.status === 'Pending' ? (
                                                <Link 
                                                    to={`/dashboard/edit-issue/${issue._id}`}
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-info/10 text-info hover:bg-info hover:text-white transition-all shadow-lg shadow-info/5"
                                                >
                                                    <FaEdit size={16} />
                                                </Link>
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-base-content/5 text-base-content/20 cursor-not-allowed">
                                                    <FaEdit size={16} />
                                                </div>
                                            )}

                                            <button 
                                                onClick={() => handleDelete(issue._id)}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-error/10 text-error hover:bg-error hover:text-white transition-all shadow-lg shadow-error/5"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {filteredIssues.length === 0 && (
                    <div className="text-center py-24 group">
                        <div className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20">📂</div>
                        <h3 className="text-2xl font-black text-base-content">Clean Slate</h3>
                        <p className="text-base-content/40 mt-2 max-w-xs mx-auto text-sm">
                            No active <span className="text-primary font-bold">reports</span> found for this category. Ready to report something new?
                        </p>
                        <Link to="/dashboard/report-issue" className="btn btn-primary rounded-full px-10 mt-8 shadow-[0_0_20px_rgba(8,203,0,0.3)]">
                            Submit Report
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default MyIssues;