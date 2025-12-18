import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaBoxOpen, FaRegCreditCard, FaUsers } from 'react-icons/fa6';
import { RiEBike2Line, RiEBikeFill, RiProfileFill, RiSecurePaymentFill } from "react-icons/ri";
// import useRole from '../Hooks/useRole';
import { GiFullMotorcycleHelmet, GiSkullStaff } from "react-icons/gi";
import Logo from '../Components/Logo';
import { MdAssignmentAdd, MdDynamicFeed, MdManageHistory, MdOutlineCrisisAlert, MdReport } from 'react-icons/md';
import MyLink from '../Components/MyLink';
import { HomeIcon, User2Icon } from 'lucide-react';
import { FcManager } from 'react-icons/fc';
import useRole from '../context/useRole';




const DashboardLayout = () => {

    const { role } = useRole();

    return (
        <div >
            <div className="drawer lg:drawer-open max-w-7xl mx-auto">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <div className="p-2 ">
                        <nav className="navbar w-full bg-base-200 rounded-2xl">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-gray-200 hover:border-0 hover:shadow-none">
                                {/* Sidebar toggle icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                            <div className="px-4 logo-font font-bold text-primary">Dashboard</div>
                        </nav>
                    </div>
                    {/* Page content here */}
                    <div className="min-h-screen">
                        <Outlet></Outlet>

                    </div>
                </div>

                <div className="drawer-side pl-2 py-2  is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start rounded-2xl bg-base-200 shadow is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <button to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right " data-tip="Homepage">
                                    {/* Home icon */}
                                    <Link to={'/'} className="my-1.5 inline-block size-4 is-drawer-open:hidden">
                                        <MdOutlineCrisisAlert className='text-green-400 font-bold' size={19} />
                                    </Link>
                                    <span className="is-drawer-close:hidden"><Logo /></span>
                                </button>
                            </li>





                            {/* Users citizen */}
                            {
                                role === 'citizen' &&
                                <>
                                {/* home  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Citizen Home">
                                        <MyLink to={'/dashboard/citizen-home'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <HomeIcon size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Citizen Home</span>
                                        </MyLink>
                                    </li>
                                    {/* report new issue */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report Issue">
                                        <MyLink to={'/dashboard/report-issue'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdReport />
                                            </span>

                                            <span className="is-drawer-close:hidden">Report Issue</span>
                                        </MyLink>
                                    </li>
                                    
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Issues">
                                        <MyLink to={'/dashboard/my-issues'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdDynamicFeed />
                                            </span>

                                            <span className="is-drawer-close:hidden">My Issues</span>
                                        </MyLink>
                                    </li>


                                </>
                            }
                            {/* user admin  */}
                            {
                                // role === 'admin' &&
                                <>
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Issues">
                                        <MyLink to={'/dashboard/manage-issues'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdManageHistory size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Manage Issues</span>
                                        </MyLink>
                                    </li>
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Admin Home">
                                        <MyLink to={'/dashboard/admin-home'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <HomeIcon size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Admin Home</span>
                                        </MyLink>
                                    </li>
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Staff">
                                        <MyLink to={'/dashboard/manage-staff'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <GiSkullStaff size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Manage Staff</span>
                                        </MyLink>
                                    </li>
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                        <MyLink to={'/dashboard/payment-history'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <RiSecurePaymentFill size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Payment History</span>
                                        </MyLink>
                                    </li>
                                </>
                            }
                            {
                                //role=='staff' &&
                                <>
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Staff Home">
                                        <MyLink to={'/dashboard/staff-home'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <HomeIcon size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Staff Home</span>
                                        </MyLink>
                                    </li>
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assigned Issues">
                                        <MyLink to={'/dashboard/assigned-issues'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdAssignmentAdd size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Assigned Issues</span>
                                        </MyLink>
                                    </li>
                                </>
                            }
                            {/* profile  */}
                            <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Profile">
                                <MyLink to={'/dashboard/my-profile'}>
                                    {/* my-parcels icon */}
                                    <span className="my-1.5 inline-block size-3">
                                        <User2Icon size={15} />
                                    </span>

                                    <span className="is-drawer-close:hidden">User Profile</span>
                                </MyLink>
                            </li>
                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;