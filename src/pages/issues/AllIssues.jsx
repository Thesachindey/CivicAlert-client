import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; 
import { useQuery } from '@tanstack/react-query';
import IssueCard from '../../Components/IssueCard';
import LoadingPage from '../LoadingPage/LoadingPage';

// Import correctly from separate folders
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import { FaFilterCircleXmark } from 'react-icons/fa6'; 

import { motion, AnimatePresence } from 'framer-motion';

const AllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState(''); 
    
    // UI Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { data: allIssues = [], isLoading } = useQuery({
        queryKey: ['issues'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues`); 
            return res.data; 
        }
    });

    // --- CLEAR FILTERS LOGIC ---
    const clearFilters = () => {
        setSearch('');
        setFilterStatus('');
        setFilterCategory('');
        setCurrentPage(1);
    };

    const isFiltered = search !== '' || filterStatus !== '' || filterCategory !== '';

    // --- CLIENT-SIDE FILTERING ---
    const filteredIssues = allIssues.filter(issue => {
        const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus ? issue.status === filterStatus : true;
        const matchesCategory = filterCategory ? issue.category === filterCategory : true;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // UI Pagination Calculation
    const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredIssues.slice(startIndex, startIndex + itemsPerPage);

    if (isLoading) return <LoadingPage />;

    return (
        <div className="py-10 min-h-screen bg-base-100 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />

            <div className='max-w-7xl mx-auto px-6'>
                <div className="text-center pb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-base-content">
                        Explore All <span className='text-primary logo-font'>Reported Issues</span>
                    </h1>
                </div>

                {/* --- FILTER BAR --- */}
                <div className="bg-base-200/50 backdrop-blur-xl p-6 rounded-[2rem] border-2 border-base-300 dark:border-white/10 mb-12 flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input 
                            type="text" 
                            placeholder="Search issues..." 
                            className="input input-bordered w-full rounded-2xl pl-12 bg-base-100/50"
                            value={search}
                            onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}
                        />
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <select 
                            className="select select-bordered rounded-2xl w-full sm:w-44 bg-base-100/50"
                            value={filterStatus}
                            onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}}
                        >
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>

                        <select 
                            className="select select-bordered rounded-2xl w-full sm:w-44 bg-base-100/50"
                            value={filterCategory}
                            onChange={(e) => {setFilterCategory(e.target.value); setCurrentPage(1);}}
                        >
                            <option value="">All Categories</option>
                            <option value="Road Damage">Road Damage</option>
                            <option value="Water Leakage">Water Leakage</option>
                            <option value="Street Lighting">Street Lighting</option>
                            <option value="Garbage Overflow">Garbage Overflow</option>
                            <option value="Public Safety">Public Safety</option>
                        </select>

                        {/* CLEAR FILTERS BUTTON */}
                        <AnimatePresence>
                            {isFiltered && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={clearFilters}
                                    className="btn btn-error btn-outline rounded-2xl gap-2 w-full sm:w-auto"
                                >
                                    <FaFilterCircleXmark /> Clear
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- ISSUES GRID / NO DATA PLACEHOLDER --- */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        {currentItems.length > 0 ? (
                            <motion.div 
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {currentItems.map((issue) => (
                                    <motion.div
                                        key={issue._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <IssueCard issue={issue} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            /* --- NO DATA FOUND PLACEHOLDER --- */
                            <motion.div
                                key="no-data"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-20 px-6 rounded-[3rem] bg-base-200/30 border-2 border-dashed border-base-300 dark:border-white/10 text-center"
                            >
                                <div className="w-24 h-24 mb-6 rounded-full bg-base-300/20 flex items-center justify-center">
                                    <FaSearch className="text-4xl text-base-content/20" />
                                </div>
                                <h3 className="text-2xl font-black text-base-content mb-2">No Reports Found</h3>
                                <p className="text-base-content/50 max-w-sm mb-8">
                                    We couldn't find any issues matching your current search or filters. Try adjusting your keywords or clearing the filters.
                                </p>
                                <button 
                                    onClick={clearFilters}
                                    className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

               {/* --- CIRCULAR EMERALD PAGINATION --- */}
{totalPages > 1 && (
    <div className="flex flex-wrap justify-center items-center mt-20 gap-4">
        
        {/* Previous Button */}
        <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-base-200/50 backdrop-blur-md border border-base-300 dark:border-white/10 text-base-content disabled:opacity-20 hover:border-primary hover:text-primary transition-all duration-300 shadow-lg group"
        >
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-3 px-4 py-2 rounded-full bg-base-200/30 backdrop-blur-xl border border-base-300 dark:border-white/5 shadow-inner">
            {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-10 h-10 rounded-full font-black text-xs transition-all duration-500 flex items-center justify-center ${
                        currentPage === idx + 1 
                        ? "bg-primary text-primary-content shadow-[0_0_20px_rgba(8,203,0,0.5)] scale-110" 
                        : "text-base-content/40 hover:bg-base-content/10 hover:text-base-content"
                    }`}
                >
                    {idx + 1}
                </button>
            ))}
        </div>

        {/* Next Button */}
        <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-base-200/50 backdrop-blur-md border border-base-300 dark:border-white/10 text-base-content disabled:opacity-20 hover:border-primary hover:text-primary transition-all duration-300 shadow-lg group"
        >
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
    </div>
)}
            </div>
        </div>
    );
};

export default AllIssues;