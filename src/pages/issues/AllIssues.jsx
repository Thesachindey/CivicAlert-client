import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; // Or useAxiosPublic if this page is public
import { useQuery } from '@tanstack/react-query';
import IssueCard from '../../Components/IssueCard';
import LoadingPage from '../LoadingPage/LoadingPage';
import { FaSearch, FaFilter } from 'react-icons/fa';

const AllIssues = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const { data: issues = [], isLoading, refetch } = useQuery({
        queryKey: ['issues', search, filterStatus, filterCategory], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?search=${search}&status=${filterStatus}&category=${filterCategory}`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="py-10 min-h-screen bg-base-100">
            <title>All Issues</title>
            <div className='bg-base-200 p-4 sm:p-10 lg:p-20 rounded-3xl max-w-7xl mx-auto'>
                
                <div className="text-center pb-10 sm:px-10">
                    <h1 className="text-4xl font-bold mb-3">
                        All Reported <span className='text-primary logo-font'>Issues</span>
                    </h1>
                    <p className="text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
                        Browse public infrastructure reports, track their status, and upvote important issues to bring them to attention.
                    </p>

                    <div className="bg-base-100 p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                        
                        {/* Search Input */}
                        <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
                            <input 
                                type="text" 
                                placeholder="Search by title..." 
                                className="input input-bordered w-full pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </form>

                        {/* Filters Group */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            
                            {/* Status Filter */}
                            <select 
                                className="select select-bordered w-full sm:w-auto"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>

                            {/* Category Filter */}
                            <select 
                                className="select select-bordered w-full sm:w-auto"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Road Damage">Road Damage</option>
                                <option value="Water Leakage">Water Leakage</option>
                                <option value="Street Lighting">Street Lighting</option>
                                <option value="Garbage Overflow">Garbage</option>
                                <option value="Public Safety">Public Safety</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Issues Grid */}
                {issues && issues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {issues.map((issue) => (
                            <IssueCard key={issue._id} issue={issue} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                         <div className="text-6xl mb-4">🔍</div>
                         <h3 className="text-xl font-bold">No issues found</h3>
                         <p className="text-gray-500">
                             No <span className='text-red-500 logo-font'>issues</span> match your filters. Try clearing them.
                         </p>
                         <button 
                            onClick={() => {setSearch(''); setFilterStatus(''); setFilterCategory('')}}
                            className="btn btn-link mt-2"
                         >
                            Clear Filters
                         </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllIssues;