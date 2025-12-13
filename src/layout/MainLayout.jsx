import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-5'>
            <NavBar/>
            <main className='min-h-screen'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;