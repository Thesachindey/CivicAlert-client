import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaUsers, FaBan, FaUnlock, FaCrown, FaSearch, FaUserTag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, UserCheck, Search, Users } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['manage-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            const allUsers = Array.isArray(res.data) ? res.data : [];
            return allUsers.filter(u => u.role === 'citizen');
        }
    });

    const toggleBlockMutation = useMutation({
        mutationFn: async ({ id, isBlocked }) => {
            return await axiosSecure.patch(`/users/block/${id}`, { isBlocked });
        },
        onSuccess: (_, variables) => {
            const status = variables.isBlocked ? "Blocked" : "Unblocked";
            toast.success(`User has been ${status}`);
            queryClient.invalidateQueries(['manage-users']);
        },
        onError: () => toast.error("Failed to update user status")
    });

    const handleBlockToggle = (user) => {
        const isBlocking = !user.isBlocked; 
        const actionText = isBlocking ? "Block" : "Unblock";
        const themeColor = isBlocking ? "#ef4444" : "#08cb00"; 

        const userName = user.displayName || user.name || "this user";

        Swal.fire({
            title: `${actionText} ${userName}?`,
            text: isBlocking 
                ? "Access to the dashboard will be restricted immediately." 
                : "The user will regain full platform access.",
            icon: isBlocking ? 'error' : 'success',
            showCancelButton: true,
            confirmButtonColor: themeColor,
            cancelButtonColor: '#3b82f6',
            confirmButtonText: `Yes, ${actionText}`,
            background: 'var(--bg-base-200)',
            color: 'var(--text-base-content)'
        }).then((result) => {
            if (result.isConfirmed) {
                toggleBlockMutation.mutate({ 
                    id: user._id, 
                    isBlocked: isBlocking 
                });
            }
        });
    };

    const filteredUsers = users.filter(user => {
        const name = (user.displayName || user.name || "").toLowerCase();
        const email = (user.email || "").toLowerCase();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || email.includes(term);
    });

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen transition-colors duration-500 relative overflow-hidden">
            <title>Manage Citizens | Civic Alert</title>
            
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header & Search Bar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                        Citizen <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Directory</span>
                    </h2>
                    <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                        <Users size={12} className="text-primary" /> Total Registered: {users.length}
                    </p>
                </motion.div>

                {/* Glass Search Input */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full md:w-80 group"
                >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity">
                        <Search size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 backdrop-blur-md border-base-300 dark:border-white/5 focus:border-primary transition-all font-medium text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </motion.div>
            </div>

            {/* Submissions Table - Ultra Glass */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto rounded-[2.5rem] bg-base-200/40 dark:bg-base-200/30 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-2xl"
            >
                <table className="table w-full">
                    <thead className="bg-base-content/5 text-base-content/60 uppercase text-[10px] font-black tracking-[0.2em]">
                        <tr>
                            <th className="py-6 pl-8">Citizen Identity</th>
                            <th>Membership Level</th>
                            <th>Account Status</th>
                            <th className="text-center pr-8">Administrative Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-base-content/80">
                        <AnimatePresence>
                            {filteredUsers.map((user, idx) => (
                                <motion.tr 
                                    key={user._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-primary/5 transition-colors border-b border-base-content/5 group"
                                >
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                                    <img 
                                                        src={user.photoURL || "https://i.ibb.co/Zm9J5M4/user-placeholder.png"} 
                                                        alt="User" 
                                                        className="object-cover" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-base-content">{user.displayName || user.name || "Unknown"}</div>
                                                <div className="text-[10px] font-mono opacity-40 lowercase mt-1">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        {user.isPremium ? (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/10 text-amber-500 border border-amber-400/20 font-black text-[10px] tracking-widest shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                                                <FaCrown /> ELITE PREMIUM
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-base-content/5 text-base-content/30 border border-base-content/5 font-black text-[10px] tracking-widest uppercase">
                                                Standard Tier
                                            </div>
                                        )}
                                    </td>

                                    <td>
                                        {user.isBlocked ? (
                                            <div className="badge badge-error badge-outline gap-2 font-black text-[9px] tracking-[0.2em] p-3 uppercase">
                                                <ShieldAlert size={10} /> Suspended
                                            </div>
                                        ) : (
                                            <div className="badge badge-success badge-outline gap-2 font-black text-[9px] tracking-[0.2em] p-3 uppercase">
                                                <UserCheck size={10} /> Authorized
                                            </div>
                                        )}
                                    </td>

                                    <td className="pr-8 text-center">
                                        <button 
                                            onClick={() => handleBlockToggle(user)}
                                            className={`btn btn-sm rounded-xl font-black tracking-widest text-[10px] px-6 h-10 border-2 transition-all group
                                                ${user.isBlocked 
                                                    ? 'btn-success btn-outline hover:bg-success hover:text-white' 
                                                    : 'btn-error btn-outline hover:bg-error hover:text-white'
                                                }`}
                                        >
                                            {user.isBlocked ? (
                                                <><FaUnlock className="group-hover:scale-110 transition-transform" /> RESTORE ACCESS</>
                                            ) : (
                                                <><FaBan className="group-hover:rotate-12 transition-transform" /> REVOKE ACCESS</>
                                            )}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-24 group">
                        <div className="text-6xl mb-6 grayscale opacity-20 group-hover:opacity-40 transition-opacity">
                            <Users size={64} className="mx-auto" />
                        </div>
                        <h3 className="text-2xl font-black text-base-content">No Citizens Found</h3>
                        <p className="text-base-content/40 mt-2 max-w-xs mx-auto text-sm italic">
                            " {searchTerm} " matched zero results in the directory.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ManageUsers;