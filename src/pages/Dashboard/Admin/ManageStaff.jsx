import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaUserTie, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, UserPlus, UserCog } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const ManageStaff = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, formState: { errors: errorsAdd } } = useForm();
    const { register: registerEdit, handleSubmit: handleSubmitEdit, setValue: setValueEdit } = useForm();

    const [loading, setLoading] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const { data: staffList = [], isLoading } = useQuery({
        queryKey: ['staff-management'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users/staff');
                return Array.isArray(res.data) ? res.data : [];
            } catch (error) {
                console.error("Staff fetch error:", error);
                return [];
            }
        }
    });

    const addStaffMutation = useMutation({
        mutationFn: async (newStaff) => await axiosSecure.post('/users/staff', newStaff),
        onSuccess: () => {
            toast.success("Staff account created successfully!");
            document.getElementById('add_staff_modal').close();
            resetAdd();
            queryClient.invalidateQueries(['staff-management']);
            setLoading(false);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to create staff account");
            setLoading(false);
        }
    });

    const updateStaffMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => await axiosSecure.put(`/users/staff/${id}`, updatedData),
        onSuccess: () => {
            toast.success("Staff updated successfully!");
            document.getElementById('edit_staff_modal').close();
            setSelectedStaff(null);
            queryClient.invalidateQueries(['staff-management']);
            setLoading(false);
        },
        onError: () => {
            toast.error("Failed to update staff");
            setLoading(false);
        }
    });

    const deleteStaffMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/users/staff/${id}`),
        onSuccess: () => {
            toast.success("Staff removed.");
            queryClient.invalidateQueries(['staff-management']);
        }
    });

    const handleAddStaff = (data) => {
        setLoading(true);
        addStaffMutation.mutate({
            ...data,
            role: 'staff',
            photoURL: "https://i.ibb.co/Zm9J5M4/user-placeholder.png",
            createdAt: new Date()
        });
    };

    const openEditModal = (staff) => {
        setSelectedStaff(staff);
        setValueEdit("name", staff.name);
        setValueEdit("email", staff.email);
        document.getElementById('edit_staff_modal').showModal();
    };

    const handleUpdateStaff = (data) => {
        setLoading(true);
        updateStaffMutation.mutate({ id: selectedStaff._id, updatedData: { name: data.name } });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Remove Staff?',
            text: "This will remove their access to the dashboard.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#08cb00',
            confirmButtonText: 'Yes, remove',
            background: 'var(--bg-base-200)',
            color: 'var(--text-base-content)'
        }).then((result) => {
            if (result.isConfirmed) deleteStaffMutation.mutate(id);
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen transition-colors duration-500 relative overflow-hidden">
            <title>Manage Staff | Civic Alert</title>
            
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                        Workforce <span className="text-primary drop-shadow-[0_0_10px_rgba(8,203,0,0.3)]">Registry</span>
                    </h2>
                    <p className="text-base-content/50 mt-1 uppercase tracking-widest text-[10px] font-bold">Active Staff Members: {staffList?.length || 0}</p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => document.getElementById('add_staff_modal').showModal()}
                    className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20 gap-2 font-black tracking-widest text-xs h-12 px-6"
                >
                    <FaPlus /> Add Staff
                </motion.button>
            </div>

            {/* Glass Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto rounded-[2.5rem] bg-base-200/40 dark:bg-base-200/30 backdrop-blur-xl border-2 border-base-300 dark:border-white/10 shadow-2xl"
            >
                <table className="table w-full">
                    <thead className="bg-base-content/5 text-base-content/60 uppercase text-[10px] font-black tracking-[0.2em]">
                        <tr>
                            <th className="py-6 pl-8">Staff Profile</th>
                            <th>Contact Info</th>
                            <th>Designation</th>
                            <th className="text-center pr-8">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="text-base-content/80">
                        <AnimatePresence>
                            {staffList.map((staff, idx) => (
                                <motion.tr 
                                    key={staff._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-primary/5 transition-colors border-b border-base-content/5 group"
                                >
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                                    <img src={staff.photoURL} alt="Avatar" className="object-cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-base-content">{staff.name}</div>
                                                <div className="text-[10px] flex items-center gap-1 opacity-40 font-bold uppercase mt-1">
                                                    <Calendar size={10} /> Joined {new Date(staff.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-mono text-xs opacity-70">
                                        <div className="flex items-center gap-2">
                                            <Mail size={12} className="text-primary" /> {staff.email}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="badge border-none bg-info/10 text-info gap-2 font-black text-[10px] tracking-widest p-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                            <FaUserTie /> FIELD STAFF
                                        </div>
                                    </td>

                                    <td className="pr-8">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(staff)}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-warning/10 text-warning hover:bg-warning hover:text-white transition-all shadow-lg shadow-warning/5"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(staff._id)}
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

                {staffList.length === 0 && (
                    <div className="text-center py-24 opacity-20">
                        <FaUserTie className="text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-black uppercase tracking-tighter">No Personnel Registered</h3>
                    </div>
                )}
            </motion.div>

            {/* --- THEMED ADD STAFF MODAL --- */}
            <dialog id="add_staff_modal" className="modal backdrop-blur-md">
                <div className="modal-box rounded-[3rem] bg-base-100 border-2 border-primary/20 shadow-2xl p-8 md:p-12 max-w-lg">
                    <div className="flex items-center gap-3 text-primary mb-8">
                        <UserPlus size={28} />
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Onboard Staff</h3>
                    </div>

                    <form onSubmit={handleSubmitAdd(handleAddStaff)} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Full Name</label>
                            <input {...registerAdd("name", { required: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300 dark:border-white/5" placeholder="e.g. John Wick" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Identity Email</label>
                            <input {...registerAdd("email", { required: true })} type="email" className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300 dark:border-white/5" placeholder="staff@civicalert.gov" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Secure Password</label>
                            <input {...registerAdd("password", { required: true, minLength: 6 })} type="password" className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300 dark:border-white/5" placeholder="••••••••" />
                        </div>

                        <div className="modal-action gap-3">
                            <button type="button" className="btn btn-ghost rounded-xl font-black tracking-widest text-[10px]" onClick={() => document.getElementById('add_staff_modal').close()}>Cancel</button>
                            <button type="submit" disabled={loading} className="btn btn-primary rounded-xl px-10 font-black tracking-widest text-[10px] shadow-lg shadow-primary/20">
                                {loading ? <span className="loading loading-spinner"></span> : "AUTHORIZE ACCESS"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* --- THEMED EDIT STAFF MODAL --- */}
            <dialog id="edit_staff_modal" className="modal backdrop-blur-md">
                <div className="modal-box rounded-[3rem] bg-base-100 border-2 border-warning/20 shadow-2xl p-8 md:p-12 max-w-lg">
                    <div className="flex items-center gap-3 text-warning mb-8">
                        <UserCog size={28} />
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Modify Profile</h3>
                    </div>

                    <form onSubmit={handleSubmitEdit(handleUpdateStaff)} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Full Name</label>
                            <input {...registerEdit("name", { required: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1">Registry Email (Immutable)</label>
                            <input {...registerEdit("email")} readOnly className="input input-bordered w-full rounded-2xl bg-base-content/5 opacity-50 cursor-not-allowed" />
                        </div>

                        <div className="modal-action gap-3">
                            <button type="button" className="btn btn-ghost rounded-xl font-black tracking-widest text-[10px]" onClick={() => document.getElementById('edit_staff_modal').close()}>Cancel</button>
                            <button type="submit" disabled={loading} className="btn btn-warning rounded-xl px-10 text-white font-black tracking-widest text-[10px] shadow-lg shadow-warning/20">
                                {loading ? <span className="loading loading-spinner"></span> : "UPDATE REGISTRY"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageStaff;