import { AddToQueue, Dashboard, People, Star, Store, TableChart, VerticalSplit } from "@material-ui/icons";

export const generalList = [
    { alternateTitle: "alt_overview", title: "overview", href: "dashboard", icon: <Dashboard />, parent: "general", hidden: false },
];

export const adminList = [
    { alternateTitle: "alt_appointments", title: "appointments", href: "appointments", icon: <AddToQueue />, parent: "management", hidden: false },
    { alternateTitle: "alt_services", title: "services", href: "services", icon: <VerticalSplit />, parent: "management", hidden: false },
];

export const superAdminList = [
    ...adminList,
    { alternateTitle: "alt_shops", title: "shops", href: "shops", icon: <Store />, parent: "management", hidden: false },
    { alternateTitle: "alt_users", title: "users", href: "users", icon: <People />, parent: "management", hidden: false },
    { alternateTitle: "alt_categories", title: "categories", href: "categories", icon: <TableChart />, parent: "management", hidden: false },
    { alternateTitle: "alt_rating", title: "rating", href: "rating", icon: <Star />, parent: "management", hidden: false },
];

const basicConfig = {
    drawerSize: 240,
    api_url: "http://localhost:5000/api/v1",
    file_url: "http://localhost:5000/file/"
};

export default basicConfig;