import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import IssueCard from '../../../Components/IssueCard';
import LoadingPage from '../../LoadingPage/LoadingPage';

const LatestResolvedIssues = () => {
    
    const axiosPublic = axios.create({
        baseURL: 'https://civic-alert-server.vercel.app/' 
    });

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['latest-resolved-issues'],
        queryFn: async () => {
            const res = await axiosPublic.get('/issues?status=Resolved');
            return res.data;
        }
    });

    if (isLoading) return <LoadingPage />;
    const displayIssues = issues.slice(0, 6);

    return (
        <div className="py-16 bg-base-100">
            <div className='container mx-auto px-4'>
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaCheckCircle className="text-green-500 text-2xl" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Latest <span className="text-green-600">Resolved</span> Issues
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        See how our community and staff are working together to fix public infrastructure problems.
                    </p>
                </div>

                {displayIssues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayIssues.map((issue) => (
                            <IssueCard key={issue._id} issue={issue} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-base-200 rounded-xl border border-dashed border-gray-300">
                        <FaCheckCircle className="mx-auto text-4xl text-gray-300 mb-3" />
                        <h3 className="text-lg font-bold text-gray-500">No resolved issues yet</h3>
                        <p className="text-gray-400 text-sm">Once the staff fixes an issue, it will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestResolvedIssues;