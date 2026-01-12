import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layout/AuthLayout";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import DashboardLayout from "../layout/DashboardLayout";
import UpdateInfo from "../pages/Profile/UpdateInfo";
import MyProfilePage from "../pages/Profile/MyProfilePage";
import PrivateRoute from "./PrivateRoute";
import AllIssues from "../pages/issues/AllIssues";
import AboutUs from "../pages/AboutUs/AboutUs";
import InsertIssue from "../pages/Dashboard/Citizen/InsertIssue";
import IssueDetails from "../pages/issues/IssueDetails";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/Payment/PaymentCanceled";
import UpdateIssue from "../pages/Dashboard/Citizen/UpdateIssue";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import AdminAllIssues from "../pages/Dashboard/Admin/AdminAllIssues";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
import PaymentHistory from "../pages/Dashboard/Admin/PaymentHistory";
import StaffHome from "../pages/Dashboard/Staff/StaffHome";
import StaffRoute from "./StaffRoute";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
import CitizenHome from "../pages/Dashboard/Citizen/CitizenHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import PrivacyPolicy from "../pages/terms/PrivacyPolicy";
import TermsConditions from "../pages/terms/TermsConditions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms-conditions',
        element: <TermsConditions />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/all-issues',
        element: <AllIssues />
      },
      {
        path: '/issue-details/:id',
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        )
      },
      {
        path: '/auth/update-profile',
        element: (
          <PrivateRoute>
            <UpdateInfo />
          </PrivateRoute>
        )
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />
      },
      {
        path: '/payment-canceled',
        element: <PaymentCanceled />
      }
    ]
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <PrivateRoute><DashboardHome /></PrivateRoute>
      },
      {
        path: 'report-issue',
        element: <PrivateRoute><InsertIssue /></PrivateRoute>
      },
      {
        path: 'my-issues',
        element: <PrivateRoute><MyIssues /></PrivateRoute>
      },
      {
        path: 'edit-issue/:id',
        element: (
          <PrivateRoute>
            <UpdateIssue />
          </PrivateRoute>
        )
      },
      {
        path: 'citizen-home',
        element: <PrivateRoute><CitizenHome /></PrivateRoute>
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-issues',
        element: <AdminRoute><AdminAllIssues /></AdminRoute>
      },
      {
        path: 'manage-staff',
        element: <AdminRoute><ManageStaff /></AdminRoute>
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: 'payment-history',
        element: <AdminRoute><PaymentHistory /></AdminRoute>
      },
      {
        path: 'admin-home',
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        )
      },
      {
        path: 'staff-home',
        element: <StaffRoute><StaffHome /></StaffRoute>
      },
      {
        path: 'assigned-issues',
        element: <StaffRoute><AssignedIssues /></StaffRoute>
      },
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ]
  },
  {
    path: '*',
    Component: NotFoundPage,
  }
]);