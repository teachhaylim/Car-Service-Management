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
import ShopIndex from "views/Shop";
import CategoryIndex from "views/Category";
import RatingIndex from "views/Rating";
import LoginView from "views/Login";
import RegisterView from "views/Register";
import CategoryEdit from "views/Category/CategoryEdit";
import ShopEdit from "views/Shop/ShopEdit";

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

const generalRoutes = [
    { path: "appointments", element: <AppointmentIndex /> },
    { path: "services", element: <ServiceIndex /> },
    {
        path: "shops",
        name: "ShopIndex",
        children: [
            { path: "/", name: "Category", element: <ShopIndex /> },
            { path: "edit", name: "Edit", element: <ShopEdit /> },
        ]
    }, //TODO dynamic shop page
];

const routes = (isLogin = false, role = 0) => {
    const tempRoutes = [
        {
            path: "app",
            element: isLogin ? <AdminLayout /> : < Navigate to="/unauthorized" />,
            children: [
                { path: "dashboard", element: <Dashboard /> }, //TODO dynamic dashboard (maybe)
                { path: "profile", element: <Dashboard /> }, //TODO dynamic dashboard (maybe)
                { path: "*", element: <Navigate to="/notfound" /> },
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
    //     tempRoutes[0].children.push(...generalRoutes);
    // else if (role === 2)
    //     tempRoutes[0].children.push(...adminRoutes, ...generalRoutes);

    tempRoutes[0].children.push(...adminRoutes, ...generalRoutes);

    return tempRoutes;
}

export default routes;