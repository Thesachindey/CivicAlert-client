import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layout/AuthLayout";
import NotFound from "../pages/NotFound/NotFoundPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import DashboardLayout from "../layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },

    ]
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        
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
      }
      ,
      {
        path: 'register',
        Component: Register,
      }

    ]
  },
  {
    path: '*',
    Component: NotFoundPage,
  }

]);