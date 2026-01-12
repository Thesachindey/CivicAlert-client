import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { FaUsers } from 'react-icons/fa6';
import { RiSecurePaymentFill, RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineManageAccounts, MdOutlineManageHistory, MdReport, MdDynamicFeed, MdAssignment } from 'react-icons/md';
import { HomeIcon, Sun, Moon } from 'lucide-react'; 
import { BiLogOutCircle } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

import useRole from '../context/useRole';
import { AuthContext } from '../context/AuthContext';
import Logo from '../Components/Logo';
import MyLink from '../Components/MyLink';

const DashboardLayout = () => {
    const { logOut } = useContext(AuthContext);
    const { role } = useRole();
    
    // --- THEME LOGIC ---
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    const handleLogOut = () => {
        Swal.fire({
            title: "Log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#08cb00",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, log out",
            background: 'var(--bg-base-200)',
            color: 'var(--text-base-content)',
            backdrop: `rgba(0,0,0,0.5) backdrop-filter: blur(4px)`,
            customClass: {
                popup: "rounded-[2rem] border-2 border-primary/20 shadow-2xl",
                title: "font-black tracking-widest text-primary",
            }
        }).then((result) => {
            if (result.isConfirmed) logOut();
        });
    };

    const ThemeButton = () => (
        <button 
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-primary hover:bg-primary/10 transition-all duration-500"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ y: -10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );

    return (
        <div className="bg-base-100 min-h-screen transition-colors duration-500">
            <div className="drawer lg:drawer-open max-w-7xl mx-auto">
                <input id="my-dashboard-drawer" type="checkbox" className="drawer-toggle" />
                
                <div className="drawer-content flex flex-col">
                    {/* Navbar (Mobile) */}
                    <header className="p-4 lg:hidden">
                        <div className="navbar bg-base-200/80 backdrop-blur-md rounded-2xl border border-base-300 dark:border-white/5 shadow-lg">
                            <label htmlFor="my-dashboard-drawer" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                            <div className="flex-1 px-2 logo-font font-bold text-primary uppercase tracking-widest text-xs">Dashboard</div>
                            <ThemeButton />
                        </div>
                    </header>

                    <main className="p-4 lg:p-8 flex-grow">
                        <Outlet />
                    </main>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="my-dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    
                    <aside className="w-72 min-h-full bg-base-200/50 backdrop-blur-2xl border-r border-base-300 dark:border-white/5 p-6 flex flex-col">
                        
                        <div className="mb-10 px-4 flex justify-between items-center">
                            <Link to="/">
                                <Logo />
                            </Link>
                            <div className="hidden p-2 lg:block">
                                <ThemeButton />
                            </div>
                        </div>

                        <ul className="menu p-0 space-y-2 grow text-base-content/70 font-medium">
                            {/* CITIZEN LINKS */}
                            {role === 'citizen' && (
                                <>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-2 mt-4 px-4 opacity-50">Citizen Portal</p>
                                    <li><MyLink to='/dashboard/citizen-home'><HomeIcon size={18} /> Citizen Home</MyLink></li>
                                    <li><MyLink to='/dashboard/report-issue'><MdReport size={18} /> Report Issue</MyLink></li>
                                    <li><MyLink to='/dashboard/my-issues'><MdDynamicFeed size={18} /> My Issues</MyLink></li>
                                </>
                            )}

                            {/* STAFF LINKS (restored) */}
                            {role === 'staff' && (
                                <>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-2 mt-4 px-4 opacity-50">Staff Portal</p>
                                    <li><MyLink to='/dashboard/staff-home'><HomeIcon size={18} /> Staff Home</MyLink></li>
                                    <li><MyLink to='/dashboard/assigned-issues'><MdAssignment size={18} /> Assigned Issues</MyLink></li>
                                </>
                            )}

                            {/* ADMIN LINKS */}
                            {role === 'admin' && (
                                <>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-2 mt-4 px-4 opacity-50">Administration</p>
                                    <li><MyLink to='/dashboard/admin-home'><HomeIcon size={18} /> Admin Home</MyLink></li>
                                    <li><MyLink to='/dashboard/manage-issues'><MdOutlineManageHistory size={18} /> Manage Issues</MyLink></li>
                                    <li><MyLink to='/dashboard/manage-staff'><MdOutlineManageAccounts size={18} /> Manage Staff</MyLink></li>
                                    <li><MyLink to='/dashboard/manage-users'><FaUsers size={18} /> Manage Citizen</MyLink></li>
                                    <li><MyLink to='/dashboard/payment-history'><RiSecurePaymentFill size={18} /> Payments</MyLink></li>
                                </>
                            )}
                        </ul>

                        <div className="pt-6 border-t border-base-300 dark:border-white/5">
                            <ul className="menu p-0 space-y-2">
                                <li><MyLink to='/dashboard/my-profile'><RiUserSettingsLine size={18} /> Profile Settings</MyLink></li>
                                <li>
                                    <button onClick={handleLogOut} className="flex items-center gap-4 text-error hover:bg-error/10 transition-colors px-4 py-3 rounded-xl group">
                                        <BiLogOutCircle size={20} className="group-hover:rotate-12 transition-transform" /> 
                                        <span className="font-bold uppercase text-[10px] tracking-widest">Logout Session</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;