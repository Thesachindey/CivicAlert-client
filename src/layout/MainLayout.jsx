import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
    <div className="">
            <NavBar/>
        <div className='max-w-7xl mx-auto px-5'>
            <main className='min-h-screen'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    </div>
    );
};

export default MainLayout;