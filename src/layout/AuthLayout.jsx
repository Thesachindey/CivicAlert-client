import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-6'>
            <main className='min-h-screen'>
            <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLayout;