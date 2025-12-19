import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaUserTie, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const ManageStaff = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
 
    const { 
        register: registerAdd, 
        handleSubmit: handleSubmitAdd, 
        reset: resetAdd, 
        formState: { errors: errorsAdd } 
    } = useForm();

    const { 
        register: registerEdit, 
        handleSubmit: handleSubmitEdit, 
        setValue: setValueEdit 
    } = useForm();

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
        mutationFn: async (newStaff) => {
            return await axiosSecure.post('/users/staff', newStaff);
        },
        onSuccess: () => {
            toast.success("Staff account created successfully!");
            document.getElementById('add_staff_modal').close();
            resetAdd();
            queryClient.invalidateQueries(['staff-management']);
            setLoading(false);
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.message || "Failed to create staff account";
            toast.error(errorMessage);
            setLoading(false);
        }
    });

    
    const updateStaffMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            return await axiosSecure.put(`/users/staff/${id}`, updatedData);
        },
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
        const staffData = {
            name: data.name,
            email: data.email,
            password: data.password, 
            role: 'staff',
            photoURL: "https://i.ibb.co/Zm9J5M4/user-placeholder.png", 
            createdAt: new Date()
        };
        addStaffMutation.mutate(staffData);
    };

    const openEditModal = (staff) => {
        setSelectedStaff(staff);
        setValueEdit("name", staff.name);
        setValueEdit("email", staff.email); 
        document.getElementById('edit_staff_modal').showModal();
    };

    const handleUpdateStaff = (data) => {
        setLoading(true);
        updateStaffMutation.mutate({
            id: selectedStaff._id,
            updatedData: {
                name: data.name,
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Remove Staff?',
            text: "This will remove their access to the dashboard.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, remove'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteStaffMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-3xl font-bold">Manage <span className="text-primary">Staff</span></h2>
                    {/* Safety Check for Length */}
                    <p className="opacity-60">Total Staff Members: {staffList?.length || 0}</p>
                </div>
                <button 
                    onClick={() => document.getElementById('add_staff_modal').showModal()}
                    className="btn btn-primary text-white shadow-lg gap-2"
                >
                    <FaPlus /> Add Staff
                </button>
            </div>

            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-200">
                <table className="table w-full">
                    <thead className="bg-base-200 uppercase text-sm">
                        <tr>
                            <th>Staff Profile</th>
                            <th>Contact</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 🚨 CRITICAL FIX: Check if staffList is actually an array before mapping */}
                        {Array.isArray(staffList) && staffList.map((staff) => (
                            <tr key={staff._id} className="hover:bg-base-50">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={staff.photoURL || "https://i.ibb.co/Zm9J5M4/user-placeholder.png"} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{staff.name}</div>
                                            <div className="text-xs opacity-50">Joined: {new Date(staff.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="font-mono text-xs">{staff.email}</td>

                                <td>
                                    <div className="badge badge-info gap-1 text-white font-bold p-3">
                                        <FaUserTie /> Staff
                                    </div>
                                </td>

                                <td className="flex justify-center gap-2">
                                    <button 
                                        onClick={() => openEditModal(staff)}
                                        className="btn btn-sm btn-square btn-ghost text-warning tooltip"
                                        data-tip="Edit Staff"
                                    >
                                        <FaEdit size={16} />
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(staff._id)}
                                        className="btn btn-sm btn-square btn-ghost text-error tooltip"
                                        data-tip="Delete Staff"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Empty State Logic */}
                {(!Array.isArray(staffList) || staffList.length === 0) && (
                    <div className="text-center py-10 opacity-50">
                        <FaUserTie className="text-4xl mx-auto mb-2" />
                        <p>No staff members found. Add one to get started.</p>
                    </div>
                )}
            </div>

         
            <dialog id="add_staff_modal" className="modal">
                <div className="modal-box">
                    <button onClick={() => document.getElementById('add_staff_modal').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FaUserTie className="text-primary"/> Add New Staff</h3>
                    
                    <form onSubmit={handleSubmitAdd(handleAddStaff)} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-bold">Full Name</label>
                            <input {...registerAdd("name", { required: true })} type="text" placeholder="e.g. John Doe" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Email</label>
                            <input {...registerAdd("email", { required: true })} type="email" placeholder="staff@site.com" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Password</label>
                            <input {...registerAdd("password", { required: true, minLength: 6 })} type="password" placeholder="••••••" className="input input-bordered w-full" />
                            <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters.</p>
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary w-full text-white mt-4">
                            {loading ? <span className="loading loading-spinner"></span> : "Create Staff Account"}
                        </button>
                    </form>
                </div>
            </dialog>

            <dialog id="edit_staff_modal" className="modal">
                <div className="modal-box">
                    <button onClick={() => document.getElementById('edit_staff_modal').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FaEdit className="text-warning"/> Update Staff</h3>
                    
                    <form onSubmit={handleSubmitEdit(handleUpdateStaff)} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-bold">Full Name</label>
                            <input {...registerEdit("name", { required: true })} type="text" className="input input-bordered w-full" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label font-bold">Email (Cannot be changed)</label>
                            <input {...registerEdit("email")} type="email" readOnly className="input input-bordered w-full bg-base-200 cursor-not-allowed" />
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-warning w-full text-white mt-4">
                            {loading ? <span className="loading loading-spinner"></span> : "Update Information"}
                        </button>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default ManageStaff;