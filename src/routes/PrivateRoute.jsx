import React from 'react';
import useAuth from '../Hooks/useAuth';
import LoadingPage from '../pages/Shared/Loading/LoadingPage';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location);


    if (loading) {
        return <LoadingPage />
    }
    if (!user) {
        return <Navigate to='/login' state={location.pathname} />
    }


    return children;
};

export default PrivateRoute;