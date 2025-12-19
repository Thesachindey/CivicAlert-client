import React, { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';



const MyIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [filterStatus, setFilterStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    // 1. Fetch User's Issues
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
            Swal.fire('Deleted!', 'Your issue has been removed.', 'success');
            queryClient.invalidateQueries(['my-issues']);
        },
        onError: () => toast.error("Failed to delete issue")
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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
        <div className="p-8 bg-base-100 min-h-screen">
            <title>My Issues</title>
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold">My <span className="text-primary">Reports</span></h2>
                    <p className="opacity-60">Manage your submitted issues ({filteredIssues.length})</p>
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                    <select 
                        className="select select-bordered select-sm w-full md:w-auto"
                        onChange={(e) => setFilterStatus(e.target.value)}
                        value={filterStatus}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <select 
                        className="select select-bordered select-sm w-full md:w-auto"
                        onChange={(e) => setFilterCategory(e.target.value)}
                        value={filterCategory}
                    >
                        <option value="">All Categories</option>
                        <option value="Road Damage">Road Damage</option>
                        <option value="Water Leakage">Water Leakage</option>
                        <option value="Street Lighting">Street Lighting</option>
                        <option value="Public Safety">Public Safety</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            {/* Issues Table */}
            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-200">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-base-200 uppercase text-sm font-bold text-base-content/70">
                        <tr>
                            <th>Issue</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIssues.map((issue) => (
                            <tr key={issue._id} className="hover:bg-base-50 transition-colors">
                                
                                {/* Column 1: Image & Title */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={issue.image} alt="Issue" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold line-clamp-1 max-w-[150px]">{issue.title}</div>
                                            <div className="text-xs opacity-50 flex items-center gap-1">
                                                {issue.priority === 'High' && <span className="text-amber-500 font-bold">★ High Priority</span>}
                                                {issue.priority === 'Normal' && <span>Normal</span>}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Column 2: Category */}
                                <td>
                                    <span className="badge badge-ghost badge-sm">{issue.category}</span>
                                </td>

                                {/* Column 3: Date */}
                                <td className="text-xs opacity-70 font-mono">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt />
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </div>
                                </td>

                                {/* Column 4: Status */}
                                <td>
                                    <div className={`badge badge-sm font-semibold 
                                        ${issue.status === 'Resolved' ? 'badge-success text-white' : 
                                          issue.status === 'In Progress' ? 'badge-info text-white' : 'badge-warning'}`}>
                                        {issue.status}
                                    </div>
                                </td>

                                {/* Column 5: Actions */}
                                <td>
                                    <div className="flex justify-center items-center gap-2">
                                        
                                        {/* View Details */}
                                        <Link 
                                            to={`/issue-details/${issue._id}`}
                                            className="btn btn-ghost btn-xs text-primary tooltip"
                                            data-tip="View Details"
                                        >
                                            <FaEye size={16} />
                                        </Link>

                                        {/* Edit (Only if Pending) */}
                                        {issue.status === 'Pending' ? (
                                            <Link 
                                                to={`/dashboard/edit-issue/${issue._id}`}
                                                className="btn btn-ghost btn-xs text-info tooltip"
                                                data-tip="Edit Issue"
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                        ) : (
                                            <button className="btn btn-ghost btn-xs text-gray-300 cursor-not-allowed tooltip" data-tip="Cannot edit">
                                                <FaEdit size={16} />
                                            </button>
                                        )}

                                        {/* Delete Usually only if Pending */}
                                        <button 
                                            onClick={() => handleDelete(issue._id)}
                                            className="btn btn-ghost btn-xs text-error tooltip"
                                            data-tip="Delete"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredIssues.length === 0 && (
                    <div className="text-center py-12 opacity-50">
                        <div className="text-5xl mb-2">📂</div>
                        <h3 className="text-lg font-bold">No issues found</h3>
                        <p>Submit a report to see it here.</p>
                        <Link to="/dashboard/report-issue" className="btn btn-primary btn-sm mt-4">
                            Report Issue
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyIssues;