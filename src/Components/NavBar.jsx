import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FaUserPlus, FaCrown, FaUserCircle, FaBars, FaTimes, FaShieldAlt } from 'react-icons/fa';
// --- RESTORED LINE ICONS ---
import { HiOutlineHome, HiOutlineClipboardDocumentList, HiOutlineUserGroup, HiOutlineInformationCircle } from "react-icons/hi2";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'; 
import Logo from './Logo';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import MyLink from './MyLink';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdLogIn } from 'react-icons/io';
import { BiLogOutCircle } from 'react-icons/bi';
import { User } from 'lucide-react'
import { MdDashboard } from 'react-icons/md';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  useEffect(() => {
    setHoveredPath(location.pathname);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const { data: dbUser } = useQuery({
    queryKey: ['navUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });

  const handelLogout = () => {
    Swal.fire({
      title: "Logging Out?",
      text: "Are you sure you want to end your session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#08cb00", 
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
      background: "#020d00", 
      color: "#ffffff"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            toast.success('Logout successfully.');
          })
          .catch((error) => {
            console.log(error.massage);
            toast.error(error.code);
          });
      }
    });
  }

  const navLinks = [
    { name: "Home", path: "/", icon: HiOutlineHome },
    { name: "All Issues", path: "/all-issues", icon: HiOutlineClipboardDocumentList },
    ...(dbUser?.role === 'citizen' ? [{ name: "My Issues", path: "/dashboard/my-issues", icon: HiOutlineUserGroup },{ name: "Dashboard", path: "/dashboard", icon: MdDashboard }] : []),
    { name: "About Us", path: "/about-us", icon: HiOutlineInformationCircle }
  ];

  const glowColor = "#f7e479"; 

  return (
    <div className='sticky top-0 z-[999] overflow-x-clip bg-base-200/30 backdrop-blur-lg border-b border-white/10 shadow-sm'>
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-5">
        
        <div className="navbar-start">
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle relative z-50"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-2 w-64 bg-base-100/70 backdrop-blur-xl rounded-box shadow-2xl border border-white/10 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                >
                  <ul className="flex flex-col p-2 relative">
                    <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-base-300/50" />
                    
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      const Icon = link.icon;
                      return (
                        <li key={link.path} className="relative mb-1">
                          {isActive && (
                            <motion.div
                              layoutId="mobile-glider"
                              className="absolute left-0 top-0 bottom-0 w-[4px] z-10"
                            >
                               <motion.div 
                                 className="absolute left-[-10px] top-0 h-full w-[25px] bg-[#f7e479]/80 blur-[15px] rounded-full"
                                 animate={{ opacity: [0.6, 1, 0.6] }}
                                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                               />
                               <div className="absolute left-0 top-0 h-full w-[4px] bg-[#f7e479] blur-[3px]" />
                               <div className="absolute left-[1px] top-0 h-full w-[2px] bg-gradient-to-b from-yellow-100 via-[#f7e479] to-yellow-400" />
                            </motion.div>
                          )}
                          <MyLink
                            to={link.path}
                            className={`flex items-center gap-3 py-3 pl-6 pr-4 text-sm font-medium transition-colors relative z-0 ${isActive ? `text-[${glowColor}]` : "text-base-content/70"}`}
                          >
                            <Icon size={18} />
                            {link.name}
                          </MyLink>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="ml-2 lg:ml-0"><Logo /></div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 gap-1 bg-base-100/40 backdrop-blur-md rounded-full px-2 relative border border-white/5">
             {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isHovered = hoveredPath === link.path;
                const Icon = link.icon;
                return (
                 <li 
                   key={link.path} 
                   className="relative"
                   onMouseEnter={() => setHoveredPath(link.path)}
                   onMouseLeave={() => setHoveredPath(location.pathname)}
                 >
                   <MyLink 
                     to={link.path}
                     className={`flex items-center gap-2 px-5 py-2 transition-colors relative z-10 hover:bg-transparent ${isActive || isHovered ? `text-[${glowColor}]` : "text-base-content/70"}`}
                   >
                     <Icon size={18} />
                     {link.name}
                     {isHovered && (
                       <motion.div
                         layoutId="desktop-glider"
                         className="absolute bottom-0 left-0 right-0 h-[2px] z-0"
                         initial={false}
                         transition={{ type: "spring", stiffness: 350, damping: 35 }}
                       >
                         <motion.div
                           className="absolute -top-[10px] left-[-10%] right-[-10%] h-[20px] bg-[#f7e479]/30 blur-[15px] rounded-full"
                           animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.95, 1.05, 0.95] }}
                           transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                         />
                         <div className="absolute -top-[1px] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#f7e479] to-transparent blur-[2px]" />
                         <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-yellow-100 to-transparent" />
                       </motion.div>
                     )}
                   </MyLink>
                 </li>
                )
             })}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className='flex justify-center gap-2 items-center  cursor-pointer'>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="relative tooltip tooltip-bottom z-[50]" data-tip={user?.displayName || 'user'}>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    
                    {dbUser?.isPremium && (
                      <motion.div
                        className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-yellow-200 via-amber-400 to-yellow-300 opacity-70 blur-[4px]"
                        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                        transition={{ 
                          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
                          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                        }}
                      />
                    )}

                    {dbUser?.role === 'admin' && (
                      <>
                        <div className="absolute inset-[-2px] rounded-full border-2 border-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>
                        <motion.div
                          className="absolute inset-[-4px] rounded-full border-2 border-cyan-400/50"
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                        />
                      </>
                    )}

                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-[3px] border-base-100">
                      <img
                        alt={user.name}
                        src={(user?.photoURL) || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {dbUser?.isPremium && (
                      <div className="absolute -top-1 -right-1 z-20 bg-amber-400 text-white p-1 rounded-full shadow-lg border-2 border-base-100">
                        <FaCrown size={10} />
                      </div>
                    )}
                    
                    {dbUser?.role === 'admin' && !dbUser?.isPremium && (
                        <div className="absolute -top-1 -right-1 z-20 bg-cyan-600 text-white p-1 rounded-full shadow-lg border-2 border-base-100">
                          <FaShieldAlt size={10} />
                        </div>
                    )}
                  </div>
                </div>

                <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100/70 backdrop-blur-xl rounded-box border border-white/10 z-[100] mt-3 space-y-2 w-52 p-2 shadow-xl">
                  <li>
                    <MyLink to={'/dashboard/my-profile'} className="justify-between">
                      <span className="flex items-center gap-2"><User className="w-4 h-4" /> Profile</span>
                      <span className="badge badge-sm bg-base-300">New</span>
                    </MyLink>
                  </li>
                  <li>
                    <MyLink to={'/dashboard'}> <MdDashboard className="inline-block w-4 h-4 mr-2" /> Dashboard </MyLink>
                  </li>
                  <li>
                    <ThemeToggle/>
                  </li>
                  <li>
                    <button onClick={handelLogout} className="flex justify-center items-center bg-error/10 text-error hover:bg-error hover:text-white btn btn-sm btn-outline border-none transition-colors cursor-pointer w-full mt-2"><BiLogOutCircle /> LogOut</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            
            <div className="dropdown dropdown-end">
 <div tabIndex={0} className="tooltip tooltip-bottom" data-tip="Account">
                <button className="btn btn-circle btn-ghost text-primary"> <FaUserCircle size={24} /> </button>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100/70 backdrop-blur-xl rounded-box w-52 space-y-2 z-[100] border border-white/10 mt-3">
                <li>
                  <ThemeToggle/>
                </li>
                <li>
                  <MyLink to="/login" className="btn btn-sm btn-ghost justify-start gap-2 font-normal"> <IoMdLogIn size={18} /> Login </MyLink>
                </li>
                <li>
                  <MyLink to="/register" className="btn btn-sm btn-primary text-white justify-start gap-2"> <FaUserPlus size={16} /> Register </MyLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.3); border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default NavBar;