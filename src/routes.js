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
import ShopAdmin from "views/Shop";
import CategoryIndex from "views/Category";
import RatingIndex from "views/Rating";
import LoginView from "views/Login";
import RegisterView from "views/Register";
import CategoryEdit from "views/Category/CategoryEdit";
import ShopEdit from "views/Shop/ShopEdit";
import ShopPersonal from "views/Shop/ShopPersonal";
import ProfileIndex from "views/Profile";
import ServiceEdit from "views/Services/ServiceEdit";
import AppointmentEdit from "views/Appointments/AppointmentEdit";

const adminRoutes = [
    { path: "users", element: <UserIndex /> },
    {
        path: "category",
        name: "CategoryIndex",
        children: [
            { path: "/", name: "Category", element: <CategoryIndex /> },
            { path: "edit", name: "Edit", element: <CategoryEdit /> },
        ]
    },
    { path: "rating", element: <RatingIndex /> },
];

const generalRoutes = (role) => [
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
            { path: "/", name: "Shop", element: role === 2 ? <ShopAdmin /> : < ShopPersonal /> },
            { path: "edit", name: "Edit", element: <ShopEdit /> },
        ]
    },
    //TODO dynamic shop page
];

const routes = (isLogin = false, role = 0) => {
    const tempRoutes = [
        {
            path: "app",
            element: isLogin ? <AdminLayout /> : < Navigate to="/unauthorized" />,
            children: [
                { path: "dashboard", element: <Dashboard /> }, //TODO dynamic dashboard (maybe)
                { path: "profile", element: <ProfileIndex /> },
                { path: "*", element: <Navigate to="/notfound" /> },
                ...generalRoutes(1),
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

    // if (role === 1)
    //     tempRoutes[0].children.push(...generalRoutes(role));
    // else if (role === 2)
    //     tempRoutes[0].children.push(...adminRoutes, ...generalRoutes);

    return tempRoutes;
}

export default routes;