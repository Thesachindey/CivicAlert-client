import React from 'react';
import useRole from '../../context/useRole';
import LoadingPage from '../LoadingPage/LoadingPage';
import AdminHome from './Admin/AdminHome';
import StaffHome from './Staff/StaffHome';
import CitizenHome from './Citizen/CitizenHome';

const DashboardHome = () => {
    const {role, roleLoading } = useRole();

    if (roleLoading) return <LoadingPage />;

    if (role === 'admin') {
        return <AdminHome />;
    }
    
    if (role === 'staff') {
        return <StaffHome />;
    }

    return <CitizenHome />;
};

export default DashboardHome;