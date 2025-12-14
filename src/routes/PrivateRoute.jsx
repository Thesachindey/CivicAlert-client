import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../pages/LoadingPage/LoadingPage';

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