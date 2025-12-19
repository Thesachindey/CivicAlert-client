import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaUsers, FaBan, FaUnlock, FaCrown, FaSearch, FaUserTag } from 'react-icons/fa';
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
        const btnColor = isBlocking ? "#d33" : "#36d399"; 

        const userName = user.displayName || user.name || "this user";

        Swal.fire({
            title: `${actionText} ${userName}?`,
            text: isBlocking 
                ? "They will lose access to their account immediately." 
                : "They will regain access to their account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: btnColor,
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, ${actionText} them!`
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
       <div className="p-4 md:p-8 bg-base-100 min-h-screen">
    <title>Manage Citizens</title>
    
    <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
        
        {/* Title & Stats */}
        <div className="w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold">Manage <span className="text-primary">Citizens</span></h2>
            <p className="opacity-60 mt-1 flex items-center gap-2 text-sm md:text-base">
                <FaUsers /> Total Citizens: {users.length}
            </p>
        </div>
        <div className="join w-full md:w-auto">
            <div className="join-item flex items-center justify-center bg-base-200 px-3">
                <FaSearch className="opacity-50"/>
            </div>
            <input 
                type="text" 
                placeholder="Search by name or email..." 
                className="input input-bordered join-item w-full md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
    <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-200 bg-white">
        <table className="table w-full">
            
            {/* Table Head */}
            <thead className="bg-base-200 uppercase text-sm font-bold text-base-content/70">
                <tr>
                    <th>User Profile</th>
                    <th>Membership</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
                {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-base-50 transition-colors whitespace-nowrap">
                        
                        <td>
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-10 h-10 md:w-12 md:h-12 bg-base-300">
                                        <img 
                                            src={user.photoURL || "https://i.ibb.co/Zm9J5M4/user-placeholder.png"} 
                                            alt={user.displayName} 
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm md:text-base">
                                        {user.displayName || user.name || "Unknown Name"}
                                    </div>
                                    <div className="text-xs md:text-sm opacity-50">
                                        {user.email || "No Email"}
                                    </div>
                                </div>
                            </div>
                        </td>
                        
                        <td>
                            {user.isPremium ? (
                                <div className="badge badge-warning gap-1 font-bold shadow-sm p-3 text-amber-900">
                                    <FaCrown /> Premium
                                </div>
                            ) : (
                                <div className="badge badge-ghost gap-1 p-3">
                                    Free
                                </div>
                            )}
                        </td>
                        <td>
                            {user.isBlocked ? (
                                <span className="badge badge-error text-white gap-1 p-3 font-semibold">
                                    <FaBan size={12}/> Blocked
                                </span>
                            ) : (
                                <span className="badge badge-success text-white gap-1 p-3 font-semibold">
                                    <FaUserTag size={12}/> Active
                                </span>
                            )}
                        </td>
                        <td className="text-center">
                            <button 
                                onClick={() => handleBlockToggle(user)}
                                className={`btn btn-sm px-4 shadow-sm border-none text-white transition-all duration-200 w-24 md:w-28
                                    ${user.isBlocked 
                                        ? 'bg-success hover:bg-green-600' 
                                        : 'bg-error hover:bg-red-600'
                                    }`}
                            >
                                {user.isBlocked ? (
                                    <> <FaUnlock /> Unblock </>
                                ) : (
                                    <> <FaBan /> Block </>
                                )}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <FaUsers className="text-5xl mb-3" />
                <h3 className="text-lg font-bold">No users found</h3>
                <p>Try adjusting your search criteria.</p>
            </div>
        )}
    </div>
</div>
    );
};

export default ManageUsers;