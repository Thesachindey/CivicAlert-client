import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaRocket, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
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
            toast.success("Status updated successfully");
            queryClient.invalidateQueries(['assigned-issues']);
            queryClient.invalidateQueries(['staff-stats']); 
        },
        onError: () => toast.error("Failed to update status")
    });

    const handleStatusChange = (id, newStatus) => {
        statusMutation.mutate({ id, status: newStatus });
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Assigned <span className="text-primary">Tasks</span></h2>

            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-200">
                <table className="table w-full">
                    <thead className="bg-base-200 uppercase text-sm">
                        <tr>
                            <th>Issue Detail</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Current Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr key={issue._id} className="hover:bg-base-50">
                                {/* Issue Info */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={issue.image} alt="Issue" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{issue.title}</div>
                                            <div className="text-xs opacity-50 flex items-center gap-1">
                                                <FaCalendarAlt /> {new Date(issue.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Location */}
                                <td>
                                    <div className="flex items-center gap-1 text-sm opacity-70">
                                        <FaMapMarkerAlt className="text-error" /> {issue.location}
                                    </div>
                                </td>

                                {/* Priority */}
                                <td>
                                    {issue.priority === 'High' ? (
                                        <span className="badge badge-warning gap-1 font-bold animate-pulse">
                                            <FaRocket /> High
                                        </span>
                                    ) : (
                                        <span className="badge badge-ghost">Normal</span>
                                    )}
                                </td>

                                {/* Current Status Badge */}
                                <td>
                                    <div className={`badge text-white font-bold p-3 ${
                                        issue.status === 'Resolved' ? 'badge-success' :
                                        issue.status === 'Closed' ? 'badge-neutral' :
                                        issue.status === 'In Progress' ? 'badge-info' :
                                        issue.status === 'Working' ? 'badge-secondary' :
                                        'badge-warning'
                                    }`}>
                                        {issue.status}
                                    </div>
                                </td>

                                {/* Status Dropdown */}
                                <td>
                                    <select 
                                        className="select select-bordered select-sm w-full max-w-xs"
                                        defaultValue={issue.status}
                                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                                        disabled={issue.status === 'Closed'} 
                                    >
                                        <option disabled>Change Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Working">Working</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {issues.length === 0 && (
                    <div className="text-center py-10 opacity-50">
                        <FaCheckCircle className="text-4xl mx-auto mb-2 text-success" />
                        <p>No tasks assigned! Good job.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignedIssues;