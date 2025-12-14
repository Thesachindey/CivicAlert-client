import React from 'react';
import { Link, NavLink } from 'react-router';
import { FaArrowUp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Logo from './Logo';
import useAuth from '../Hooks/useAuth';
import MyLink from './MyLink';
import { motion, MotionConfig } from 'framer-motion';
import { IoMdLogIn } from 'react-icons/io';
import { BiLogOutCircle } from 'react-icons/bi';
import { Calendar, Home, ListChecks, PlusCircle, User, UserCheck } from 'lucide-react'
import { MdDashboard } from 'react-icons/md';

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handelLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logout successfully.');
      })
      .catch((error) => {
        console.log(error.massage);
        toast.error(error.code);
      })
  }



  // nav links 
  const Links = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/about_us">About Us</NavLink></li>
    <li><NavLink to="/coverage">Coverage</NavLink></li>
    <li><NavLink to="/send_parcel">Send Parcel</NavLink></li>

    {
      user &&
      <>
        <li><NavLink to="/dashboard/my-parcels">My Parcels</NavLink></li>
      </>
    }
  </>

  return (
    <div className=''>
      <div className="navbar shadow bg-base-200 rounded-b-xl ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="px-3 py-4 cursor-pointer transform transition duration-300 hover:scale-105 hover:text-primary lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {Links}
              {/* btn  */}
              {
                user
                  ?
                  <button onClick={handelLogout} className='btn mr-3 px-5 border-0 rounded-full text-center btn-outline hover:text-primary/50  hover:bg-transparent hover:shadow-none text-primary outline-primary outline-1 relative  my-2'>Log Out</button>
                  :
                  <Link to={'/login'} className='btn mr-3 px-5 border-0 rounded-full text-center btn-outline hover:text-primary/50 hover:shadow-none  hover:bg-transparent text-primary outline-primary outline-1 relative  my-2'>Sign In</Link>
              }
            </ul>
          </div>
          {/* logo  */}
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {Links}
          </ul>
        </div>
        <div className="navbar-end  pr-10 ">
          {/* btn  */}

          {user ?
            <div className='flex justify-center gap-2 items-center'>
              <div className="dropdown dropdown-end ">

                <div
                  tabIndex={0}
                  role="button"
                  className="relative tooltip tooltip-bottom"
                  data-tip={user?.displayName || 'user'}
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">


                    <motion.div
                      className="absolute flex items-center justify-center pointer-events-none"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr 
            from-gray-400 via-blue-300 to-purple-300 p-[2px]">
                        <div className="w-full h-full rounded-full bg-base-100"></div>
                      </div>
                    </motion.div>


                    <div className="relative z-10 w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                      <img
                        alt={user.name}
                        src={(user?.photoURL) || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}

                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>


                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box border z-100 mt-3 space-y-2 w-52 p-2 shadow"
                >
                  <li>
                    <MyLink to={'/my-profile'} className="justify-between">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        My Profile
                      </span>
                      <span className="badge bg-base-300">New</span>
                    </MyLink>
                  </li>

                  <li>
                    <MyLink to={'/dashboard'}>
                      <MdDashboard className="inline-block w-4 h-4 mr-2" />
                     Dashboard
                    </MyLink>
                  </li>
                  <li>
                    <MyLink to={'/create-event'}>
                      <PlusCircle className="inline-block w-4 h-4 mr-2" />
                      Create Event
                    </MyLink>
                  </li>

                  <li>
                    <MyLink to={'/manage-events'}>
                      <ListChecks className="inline-block w-4 h-4 mr-2" />
                      Manage Events
                    </MyLink>
                  </li>

                  <li>
                    <MyLink to={'/joined-events'}>
                      <UserCheck className="inline-block w-4 h-4 mr-2" />
                      Joined Events
                    </MyLink>
                  </li>
                  <li>
                    <button onClick={handelLogout} className="flex justify-center items-center bg-primary text-white  hover:bg-green-500 btn btn-outline border-black transition-colors cursor-pointer "><BiLogOutCircle />LogOut</button>
                  </li>


                </ul>
              </div>

            </div>

            :

            <div className='flex justify-center items-center gap-3.5'>

              <MyLink to={'/login'} className="flex btn-outline border-black justify-center items-center bg-primary text-white  hover:bg-green-500 btn transition-colors cursor-pointer "><IoMdLogIn />Login</MyLink>
            </div>

          }
        </div>

      </div>
    </div>
  );
};

export default NavBar;