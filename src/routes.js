import { Navigate } from "react-router-dom";

// Pages
import AdminLayout from "layouts/AdminLayout";
import MainLayout from "layouts/MainLayout";
import Dashboard from "views/Overview";
import NotFound from "views/NotFoundPage";
import Unauthorized from "views/UnauthorizedPage";
import UserIndex from "views/User";
import AppointmentIndex from "views/Appointments";
import ServiceIndex from "views/Services";
import ShopIndex from "views/Shops";
import CategoriesIndex from "views/Categories";
import RatingIndex from "views/Rating";
import LoginView from "views/Login";
import RegisterView from "views/Register";

const routes = (isLogin) => [
    {
        path: "app",
        element: isLogin ? <AdminLayout /> : < Navigate to= "/unauthorized" />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <UserIndex /> },
            { path: "appointments", element: <AppointmentIndex /> },
            { path: "services", element: <ServiceIndex /> },
            { path: "shops", element: <ShopIndex /> },
            { path: "categories", element: <CategoriesIndex /> },
            { path: "rating", element: <RatingIndex /> },
            { path: "*", element: <Navigate to="/notfound" /> }
        ]
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/login", element: <LoginView /> },
            { path: "/register", element: <RegisterView /> },
            { path: "/", element: <Navigate to="/app/dashboard" /> },
            { path: "*", element: <Navigate to="/notfound" /> }
        ]
    },
    { path: "/notfound", element: <NotFound /> },
    { path: "/unauthorized", element: <Unauthorized /> },
];

export default routes;