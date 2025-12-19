import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router';
import { FaBoxOpen, FaRegCreditCard, FaUsers, FaUserSecret } from 'react-icons/fa6';
import { RiEBike2Line, RiEBikeFill, RiProfileFill, RiSecurePaymentFill, RiUserSettingsFill, RiUserSettingsLine } from "react-icons/ri";
// import useRole from '../Hooks/useRole';
import { GiCrescentStaff, GiFullMotorcycleHelmet, GiSkullStaff } from "react-icons/gi";
import Logo from '../Components/Logo';
import { MdAssignment, MdAssignmentAdd, MdDynamicFeed, MdGroupWork, MdManageAccounts, MdManageHistory, MdOutlineCrisisAlert, MdOutlineManageAccounts, MdOutlineManageHistory, MdReport } from 'react-icons/md';
import MyLink from '../Components/MyLink';
import { GroupIcon, HomeIcon, User2Icon, UserStar } from 'lucide-react';
import { FcManager } from 'react-icons/fc';
import useRole from '../context/useRole';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { BiLogOutCircle } from 'react-icons/bi';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';




const DashboardLayout = () => {
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        Swal.fire({
            title: "Log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, log out",
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
        });
    };


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





                            {/* User citizen */}
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
                                    {/* my issue  */}
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
                                role === 'admin' &&
                                <>
                                    {/* home  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Admin Home">
                                        <MyLink to={'/dashboard/admin-home'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <HomeIcon size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Admin Home</span>
                                        </MyLink>
                                    </li>
                                    {/* manage issue  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Issues">
                                        <MyLink to={'/dashboard/manage-issues'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdOutlineManageHistory size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Manage Issues</span>
                                        </MyLink>
                                    </li>
                                    {/* Manage staff  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Staff">
                                        <MyLink to={'/dashboard/manage-staff'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdOutlineManageAccounts size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Manage Staff</span>
                                        </MyLink>
                                    </li>
                                    {/* manage citizen  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Citizen">
                                        <MyLink to={'/dashboard/manage-users'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <FaUsers size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Manage Citizen</span>
                                        </MyLink>
                                    </li>
                                    {/* all payment history of citizen  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History Of Citizen">
                                        <MyLink to={'/dashboard/payment-history'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <RiSecurePaymentFill size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Payment History Of Citizen</span>
                                        </MyLink>
                                    </li>
                                </>
                            }
                            {/* staff  */}
                            {
                                role == 'staff' &&
                                <>
                                    {/* Home  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Staff Home">
                                        <MyLink to={'/dashboard/staff-home'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <HomeIcon size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Staff Home</span>
                                        </MyLink>
                                    </li>
                                    {/* assigned issue  */}
                                    <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assigned Issues">
                                        <MyLink to={'/dashboard/assigned-issues'}>
                                            {/* my-parcels icon */}
                                            <span className="my-1.5 inline-block size-3">
                                                <MdAssignment size={15} />
                                            </span>

                                            <span className="is-drawer-close:hidden">Assigned Issues</span>
                                        </MyLink>
                                    </li>
                                </>
                            }


                        </ul>
                        <ul className="menu w-full ">
                            {/* profile  */}
                            <li className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="Profile Settings">
                                <MyLink to={'/dashboard/my-profile'}>
                                    {/* my-parcels icon */}
                                    <span className="my-1.5 inline-block size-3">
                                        <RiUserSettingsLine size={15} />
                                    </span>

                                    <span className="is-drawer-close:hidden"> Profile Settings</span>
                                </MyLink>
                            </li>


                            {/* List item */}
                            <li className="is-drawer-close:tooltip  is-drawer-close:tooltip-right font-bold" data-tip="Logout">
                                <span onClick={handleLogOut}>
                                    <span className="my-1.5 inline-block size-3">
                                        <BiLogOutCircle size={15} />
                                    </span>
                                    <span className="is-drawer-close:hidden">Logout</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;