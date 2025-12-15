import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import IssueCard from '../../Components/IssueCard';
import LoadingPage from '../LoadingPage/LoadingPage';

const AllIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: issues = [], isLoading } = useQuery({
        queryKey: [`issues`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues`)
            return res.data;
        }
    })
    console.log(issues)
    if (isLoading) return <LoadingPage />

    return (
        <div className="py-10">
            <div className='bg-base-200 p-4 sm:p-10 lg:p-20 rounded-3xl'>
                <div className="text-center pb-10 sm:px-10">
                    <h1 className="text-4xl font-bold mb-3">All Reported <span className='text-primary logo-font'>Issues</span> </h1>
                    <p className="text-sm text-gray-600 mb-8">
                        This page displays all reported public infrastructure issues submitted by citizens. <br />
                        Users can view issue details, track current status, and support important issues
                        through upvotes to help authorities prioritize necessary actions.
                    </p>

                </div>
                {issues && issues.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {
                        issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)
                    }
                </div>) : (<p className="text-center text-gray-500 text-lg mt-10">
  No <span className='text-red-500 logo-font'>issues</span> found. Try changing filters or check back later.
</p>)}
            </div>
        </div>
    );
};

export default AllIssues;