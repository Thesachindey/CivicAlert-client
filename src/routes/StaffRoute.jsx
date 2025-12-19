import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../context/useRole';
import Forbidden from '../pages/forbiden/Forbidden';
import LoadingPage from '../pages/LoadingPage/LoadingPage';

const StaffRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <LoadingPage />
    }
    if (user && role === 'staff') {
        return children;
    }

    if (!user) {
         return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Forbidden />;
};

export default StaffRoute;