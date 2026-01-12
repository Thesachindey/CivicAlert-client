import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaRocket, FaCalendarAlt, FaCheckCircle, FaTasks } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import LoadingPage from '../../LoadingPage/LoadingPage';

const AssignedIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['assigned-issues', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-issues/${user.email}`);
            return res.data;
        }
    });

    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return await axiosSecure.patch(`/issues/status/${id}`, { status });
        },
        onSuccess: () => {
            toast.success("Operational status updated");
            queryClient.invalidateQueries(['assigned-issues']);
            queryClient.invalidateQueries(['staff-stats']); 
        },
        onError: () => toast.error("Update failed")
    });

    const handleStatusChange = (id, newStatus) => {
        statusMutation.mutate({ id, status: newStatus });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen transition-colors duration-500 relative overflow-hidden">
            <title>Assigned Tasks | Civic Alert</title>

            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    Assigned <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Tasks</span>
                </h2>
                <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                    <FaTasks className="text-primary" /> Personnel Action Queue ({issues.length})
                </p>
            </motion.div>

            {/* Submissions Table - Ultra Glass */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto rounded-[2.5rem] bg-base-200/40 dark:bg-base-200/30 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-2xl"
            >
                <table className="table w-full">
                    <thead className="bg-base-content/5 text-base-content/60 uppercase text-[10px] font-black tracking-[0.2em]">
                        <tr>
                            <th className="py-6 pl-8">Issue Details</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Current Status</th>
                            <th className="pr-8 text-center">Protocol Update</th>
                        </tr>
                    </thead>
                    <tbody className="text-base-content/80">
                        <AnimatePresence>
                            {issues.map((issue, idx) => (
                                <motion.tr 
                                    key={issue._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-primary/5 transition-colors border-b border-base-content/5 group"
                                >
                                    {/* Issue Info */}
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                                    <img src={issue.image} alt="Issue" className="object-cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-base-content">{issue.title}</div>
                                                <div className="text-[10px] flex items-center gap-1 opacity-40 font-bold uppercase mt-1">
                                                    <FaCalendarAlt size={10} /> {new Date(issue.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td>
                                        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter text-base-content/70">
                                            <FaMapMarkerAlt className="text-error animate-pulse" /> {issue.location}
                                        </div>
                                    </td>

                                    {/* Priority */}
                                    <td>
                                        {issue.priority === 'High' ? (
                                            <span className="badge border-none bg-amber-400/10 text-amber-600 gap-1 font-black text-[9px] tracking-widest p-2.5 uppercase shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                                                <FaRocket size={10} /> High
                                            </span>
                                        ) : (
                                            <span className="badge border-none bg-base-content/5 text-base-content/40 font-black text-[9px] tracking-widest p-2.5 uppercase">
                                                Normal
                                            </span>
                                        )}
                                    </td>

                                    {/* Current Status Badge */}
                                    <td>
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border-2
                                            ${issue.status === 'Resolved' ? 'border-primary/40 text-primary bg-primary/10 shadow-[0_0_15px_rgba(8,203,0,0.2)]' :
                                              issue.status === 'Closed' ? 'border-neutral/40 text-neutral-content bg-neutral/20' :
                                              issue.status === 'In Progress' ? 'border-info/40 text-info bg-info/10' :
                                              issue.status === 'Working' ? 'border-secondary/40 text-secondary bg-secondary/10' :
                                              'border-warning/40 text-warning bg-warning/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]'}
                                        `}>
                                            {issue.status}
                                        </div>
                                    </td>

                                    {/* Status Dropdown */}
                                    <td className="pr-8">
                                        <div className="flex justify-center">
                                            <select 
                                                className="select select-bordered select-sm w-full max-w-[140px] rounded-xl bg-base-100/50 border-base-300 dark:border-white/10 font-bold text-[10px] tracking-wider focus:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                                defaultValue={issue.status}
                                                onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                                                disabled={issue.status === 'Closed'} 
                                            >
                                                <option disabled>Protocol Protocol</option>
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Working">Working</option>
                                                <option value="Resolved">Resolved</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Empty State */}
                {issues.length === 0 && (
                    <div className="text-center py-24 group">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }} 
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-6xl mb-6 grayscale opacity-20"
                        >
                            <FaCheckCircle className="mx-auto text-primary" />
                        </motion.div>
                        <h3 className="text-2xl font-black text-base-content uppercase tracking-tighter">Zero Queue</h3>
                        <p className="text-base-content/40 mt-2 max-w-xs mx-auto text-sm italic font-medium">
                            No field tasks assigned to your profile. Relax or check back for new reports.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AssignedIssues;