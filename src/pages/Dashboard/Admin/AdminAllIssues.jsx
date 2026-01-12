import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaUserPlus, FaCheckCircle, FaTimesCircle, FaRocket, FaUserTie } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Briefcase, Hash } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const AdminAllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedIssue, setSelectedIssue] = useState(null); 

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['admin-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues'); 
            return res.data;
        }
    });

    const { data: staffList = [] } = useQuery({
        queryKey: ['staff-list'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/staff');
            return res.data;
        }
    });

    const assignMutation = useMutation({
        mutationFn: async ({ issueId, staffData }) => {
            return await axiosSecure.patch(`/issues/assign/${issueId}`, staffData);
        },
        onSuccess: () => {
            toast.success("Staff assigned successfully!");
            document.getElementById('assign_modal').close();
            queryClient.invalidateQueries(['admin-issues']);
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.patch(`/issues/reject/${id}`),
        onSuccess: () => {
            toast.success("Issue rejected.");
            queryClient.invalidateQueries(['admin-issues']);
        }
    });

    const handleAssignSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const staffId = form.staff.value;
        const selectedStaff = staffList?.find(s => s._id === staffId);

        if (!selectedStaff) return toast.error("Please select a staff member");

        assignMutation.mutate({
            issueId: selectedIssue._id,
            staffData: {
                staffId: selectedStaff._id,
                staffName: selectedStaff.name,
                staffEmail: selectedStaff.email
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: 'Reject Issue?',
            text: "This will mark the issue as invalid and stop further action.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#08cb00',
            confirmButtonText: 'Yes, Reject',
            background: 'var(--bg-base-200)',
            color: 'var(--text-base-content)'
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen transition-colors duration-500 relative overflow-hidden">
            <title>Admin Issues | Civic Alert</title>
            
            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    Manage <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Issues</span>
                </h2>
                <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold">
                    Review, Dispatch, or Reject Infrastructure Reports
                </p>
            </motion.div>

            {/* Glass Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto rounded-[2.5rem] bg-base-200/40 dark:bg-base-200/30 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-2xl"
            >
                <table className="table w-full">
                    <thead className="bg-base-content/5 text-base-content/60 uppercase text-[10px] font-black tracking-[0.2em]">
                        <tr>
                            <th className="py-6 pl-8">Incident Details</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Staff Allocation</th>
                            <th className="text-center pr-8">Control</th>
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
                                    <td className="pl-8 py-4">
                                        <div className="font-black text-sm text-base-content group-hover:text-primary transition-colors">{issue.title}</div>
                                        <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter mt-1">{issue.category}</div>
                                    </td>
                                    
                                    <td>
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border-2
                                            ${issue.status === 'Resolved' ? 'border-primary/40 text-primary bg-primary/10 shadow-[0_0_15px_rgba(8,203,0,0.2)]' : 
                                              issue.status === 'Rejected' ? 'border-error/40 text-error bg-error/10' : 
                                              'border-warning/40 text-warning bg-warning/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]'}
                                        `}>
                                            {issue.status}
                                        </div>
                                    </td>

                                    <td>
                                        {issue.priority === 'High' ? (
                                            <div className="flex items-center gap-2 text-amber-500 font-black italic text-[10px] uppercase animate-pulse">
                                                <FaRocket size={12} /> Boosted
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold opacity-30 uppercase">Standard</span>
                                        )}
                                    </td>

                                    <td>
                                        {issue.assignedStaff ? (
                                            <div className="flex items-center gap-2 text-info text-xs font-bold">
                                                <FaUserTie className="opacity-50" /> {issue.assignedStaff.name}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-base-content/20 font-black uppercase tracking-tighter italic">Pending Assign</span>
                                        )}
                                    </td>

                                    <td className="pr-8 text-center">
                                        <div className="flex justify-center gap-2">
                                            {!issue.assignedStaff && issue.status !== 'Rejected' && issue.status !== 'Resolved' && (
                                                <button 
                                                    onClick={() => {
                                                        setSelectedIssue(issue);
                                                        document.getElementById('assign_modal').showModal();
                                                    }}
                                                    className="btn btn-xs btn-primary rounded-lg font-black tracking-widest px-4 h-8"
                                                >
                                                    <FaUserPlus /> ASSIGN
                                                </button>
                                            )}

                                            {issue.status === 'Pending' && (
                                                <button 
                                                    onClick={() => handleReject(issue._id)}
                                                    className="btn btn-xs btn-outline btn-error rounded-lg font-black tracking-widest px-4 h-8"
                                                >
                                                    <FaTimesCircle /> REJECT
                                                </button>
                                            )}

                                            {issue.status === 'Resolved' && (
                                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(8,203,0,0.3)]">
                                                    <FaCheckCircle size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </motion.div>

            {/* --- THEMED ASSIGN MODAL --- */}
            <dialog id="assign_modal" className="modal backdrop-blur-sm">
                <div className="modal-box rounded-[2.5rem] bg-base-100 border-2 border-primary/20 shadow-2xl p-8 max-w-md">
                    <div className="flex items-center gap-3 text-primary mb-6">
                        <Briefcase size={24} />
                        <h3 className="text-xl font-black uppercase tracking-tighter">Staff Allocation</h3>
                    </div>
                    
                    <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mb-6 leading-relaxed">
                        Dispatching workforce for: <br/>
                        <span className="text-base-content text-sm">{selectedIssue?.title}</span>
                    </p>
                    
                    <form onSubmit={handleAssignSubmit}>
                        <div className="space-y-2 mb-8">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">
                                <FaUserTie size={12} className="text-primary" /> Available Field Staff
                            </label>
                            <select 
                                name="staff" 
                                className="select select-bordered w-full rounded-2xl bg-base-200/50 border-base-300 dark:border-white/5 font-bold text-sm" 
                                required 
                                defaultValue=""
                            >
                                <option value="" disabled>-- Select Verified Staff --</option>
                                {staffList?.map((staff) => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button 
                                type="button" 
                                className="btn btn-ghost rounded-xl font-black uppercase tracking-widest text-[10px]" 
                                onClick={() => document.getElementById('assign_modal').close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary rounded-xl px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                                Confirm Dispatch
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AdminAllIssues;