import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaCalendarAlt, FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    if (isLoading) return <LoadingPage />;

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Payment <span className="text-primary">History</span></h2>

            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-200">
                <table className="table w-full">
                    <thead className="bg-base-200 uppercase text-sm">
                        <tr>
                            <th>User</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((pay) => (
                            <tr key={pay._id} className="hover:bg-base-50">
                                <td>
                                    <div className="font-bold flex items-center gap-2">
                                        <FaUser className="text-gray-400"/> {pay.name}
                                    </div>
                                    <div className="text-xs opacity-50 ml-6">{pay.email}</div>
                                </td>
                                
                                <td className="font-mono text-xs">{pay.transactionId}</td>

                                <td className="font-bold text-success">
                                    ${pay.amount}
                                </td>

                                <td>
                                    {pay.type === 'subscription' ? (
                                        <span className="badge badge-warning text-white">Subscription</span>
                                    ) : (
                                        <span className="badge badge-info text-white">Issue Boost</span>
                                    )}
                                </td>

                                <td className="text-sm opacity-70">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt /> {new Date(pay.date).toLocaleDateString()}
                                    </div>
                                </td>

                                <td>
                                    <span className="badge badge-success badge-outline font-bold">Paid</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {payments.length === 0 && (
                    <div className="text-center py-10 opacity-50">
                        No payments found yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;