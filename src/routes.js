import { Navigate } from "react-router-dom";

// Pages
import AdminLayout from "layouts/AdminLayout";
import MainLayout from "layouts/MainLayout";
import Dashboard from "views/Overview";
import NotFound from "views/NotFound";
import UserIndex from "views/User";
import AppointmentIndex from "views/Appointments";
import ServiceIndex from "views/Services";
import ShopIndex from "views/Shops";
import CategoriesIndex from "views/Categories";
import RatingIndex from "views/Rating";
import LoginView from "views/Login";
import RegisterView from "views/Register";

const routes = [
    {
        path: "app",
        element: <AdminLayout />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <UserIndex /> },
            { path: "appointments", element: <AppointmentIndex /> },
            { path: "services", element: <ServiceIndex /> },
            { path: "shops", element: <ShopIndex /> },
            { path: "categories", element: <CategoriesIndex /> },
            { path: "rating", element: <RatingIndex /> },
            { path: "*", element: <Navigate to="/404" /> }
        ]
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "404", element: <NotFound /> },
            { path: "/register", element: <RegisterView /> },
            { path: "/", element: <Navigate to="/app/dashboard" /> },
            { path: "*", element: <Navigate to="/404" /> }
        ]
    },
    {
        path: "/login",
        element: <LoginView />
    },
];

export default routes;