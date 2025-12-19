import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaUserPlus, FaCheckCircle, FaTimesCircle, FaRocket, FaUserTie } from 'react-icons/fa';
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
            text: "This will mark the issue as invalid.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Reject'
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            <title>Admin Issues</title>
            <h2 className="text-3xl font-bold mb-6">Manage <span className="text-primary">Issues</span></h2>

            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-200">
                <table className="table w-full">
                    <thead className="bg-base-200 uppercase text-sm">
                        <tr>
                            <th>Issue Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Assigned To</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr key={issue._id} className="hover:bg-base-50">
                                <td>
                                    <div className="font-bold">{issue.title}</div>
                                    <div className="text-xs opacity-50">{issue.category}</div>
                                </td>
                                
                                <td>
                                    <div className={`badge font-bold ${
                                        issue.status === 'Resolved' ? 'badge-success' : 
                                        issue.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                                    }`}>
                                        {issue.status}
                                    </div>
                                </td>

                                <td>
                                    {issue.priority === 'High' ? (
                                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                                            <FaRocket /> High
                                        </div>
                                    ) : (
                                        <span className="opacity-70">Normal</span>
                                    )}
                                </td>

                                <td>
                                    {issue.assignedStaff ? (
                                        <div className="flex items-center gap-2 text-info font-semibold">
                                            <FaUserTie /> {issue.assignedStaff.name}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">Unassigned</span>
                                    )}
                                </td>

                                {/* action */}
                                <td className="flex justify-center gap-2">
                                    {/* Assign Button (Only if unassigned and not rejected/resolved) */}
                                    {!issue.assignedStaff && issue.status !== 'Rejected' && issue.status !== 'Resolved' && (
                                        <button 
                                            onClick={() => {
                                                setSelectedIssue(issue);
                                                document.getElementById('assign_modal').showModal();
                                            }}
                                            className="btn btn-xs btn-primary"
                                        >
                                            <FaUserPlus /> Assign
                                        </button>
                                    )}

                                    {/* Reject Button (Only if Pending) */}
                                    {issue.status === 'Pending' && (
                                        <button 
                                            onClick={() => handleReject(issue._id)}
                                            className="btn btn-xs btn-outline btn-error"
                                        >
                                            <FaTimesCircle /> Reject
                                        </button>
                                    )}

                                    {/* Resolved Indicator */}
                                    {issue.status === 'Resolved' && (
                                        <FaCheckCircle className="text-success text-xl" title="Resolved" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* assign staff modal */}
            <dialog id="assign_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Assign Staff</h3>
                    <p className="mb-4 text-sm opacity-70">
                        Assigning staff to: <span className="font-bold text-primary">{selectedIssue?.title}</span>
                    </p>
                    
                    <form onSubmit={handleAssignSubmit}>
                        <div className="form-control w-full mb-6">
                            <label className="label font-bold">Select Staff Member</label>
                            <select name="staff" className="select select-bordered w-full" required defaultValue="">
                                <option value="" disabled>-- Choose Staff --</option>
                              
                                {staffList?.map((staff) => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.name} ({staff.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={() => document.getElementById('assign_modal').close()}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Confirm Assignment</button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default AdminAllIssues;