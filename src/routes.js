import { Navigate } from "react-router-dom";

// Pages
import AdminLayout from "layouts/AdminLayout";
import MainLayout from "layouts/MainLayout";
import NotFound from "views/NotFoundPage";
import Unauthorized from "views/UnauthorizedPage";
import UserIndex from "views/User";
import AppointmentIndex from "views/Appointments";
import ServiceIndex from "views/Services";
import ShopAdmin from "views/Shop";
import CategoryIndex from "views/Category";
// eslint-disable-next-line
import RatingIndex from "views/Rating"; // backlog feature
import LoginView from "views/Login";
import RegisterView from "views/Register";
import CategoryEdit from "views/Category/CategoryEdit";
import ShopEdit from "views/Shop/ShopEdit";
import ShopPersonal from "views/Shop/ShopPersonal";
import ProfileIndex from "views/Profile";
import ServiceEdit from "views/Services/ServiceEdit";
import AppointmentEdit from "views/Appointments/AppointmentEdit";
import UserEdit from "views/User/UserEdit";
import DashboardPersonal from "views/Overview/indexPersonal";
import DashboardAdmin from "views/Overview";

const adminRoutes = [
    {
        path: "users",
        name: "UserIndex",
        children: [
            { path: "/", name: "User", element: <UserIndex /> },
            { path: "edit", name: "Edit", element: <UserEdit /> },
        ]
    },
    {
        path: "category",
        name: "CategoryIndex",
        children: [
            { path: "/", name: "Category", element: <CategoryIndex /> },
            { path: "edit", name: "Edit", element: <CategoryEdit /> },
        ]
    },
    {
        path: "shops",
        name: "Shop",
        children: [
            { path: "/", name: "Shop", element: <ShopAdmin /> },
            { path: "edit", name: "Edit", element: <ShopEdit /> },
        ]
    },
    // { path: "rating", element: <RatingIndex /> }, //backlog feature
];

const generalRoutes = [
    {
        path: "appointments",
        name: "Appointment",
        children: [
            { path: "/", name: "Appointment", element: <AppointmentIndex />, },
            { path: "edit", name: "Edit", element: <AppointmentEdit /> },
        ]
    },
    {
        path: "services",
        name: "Service",
        children: [
            { path: "/", name: "Service", element: <ServiceIndex /> },
            { path: "edit", name: "Edit", element: <ServiceEdit /> },
        ]
    },
    {
        path: "shops",
        name: "Shop",
        children: [
            { path: "/", name: "Shop", element: < ShopPersonal /> },
            { path: "edit", name: "Edit", element: <ShopEdit /> },
        ]
    },
];

const routes = (isLogin = false, role = -1) => [
    {
        path: "app",
        element: isLogin ? <AdminLayout /> : < Navigate to="/unauthorized" />,
        children: [
            { path: "dashboard", element: role === 2 ? <DashboardAdmin /> : <DashboardPersonal /> }, //TODO dynamic dashboard (maybe)
            { path: "profile", element: <ProfileIndex /> },
            { path: "*", element: <Navigate to="/notfound" /> },
            ...(role === -1 ? [] : role === 2 ? adminRoutes : generalRoutes),
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