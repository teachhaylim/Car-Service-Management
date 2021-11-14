import { AccountBox, AddToQueue, Dashboard, People, Store, TableChart, VerticalSplit } from "@mui/icons-material";

export const roles = ["user", "admin", "super admin"];

export const generalList = [
    { alternateTitle: "alt_overview", title: "overview", href: "dashboard", icon: <Dashboard />, parent: "general", hidden: false },
    { alternateTitle: "alt_profile", title: "profile", href: "profile", icon: <AccountBox />, parent: "general", hidden: false },
];

export const adminList = [
    { alternateTitle: "alt_appointments", title: "appointments", href: "appointments", icon: <AddToQueue />, parent: "management", hidden: false },
    { alternateTitle: "alt_services", title: "services", href: "services", icon: <VerticalSplit />, parent: "management", hidden: false },
    { alternateTitle: "alt_shops", title: "shops", href: "shops", icon: <Store />, parent: "management", hidden: false },
];

export const superAdminList = [
    { alternateTitle: "alt_categories", title: "categories", href: "category", icon: <TableChart />, parent: "management", hidden: false },
    { alternateTitle: "alt_users", title: "users", href: "users", icon: <People />, parent: "management", hidden: false },
    { alternateTitle: "alt_shops", title: "shops", href: "shops", icon: <Store />, parent: "management", hidden: false },
    // { alternateTitle: "alt_rating", title: "rating", href: "rating", icon: <Star />, parent: "management", hidden: false },
];

export const langItems = [
    { country: "US", title: "English", value: "en" },
    { country: "KH", title: "ភាសាខ្មែរ", value: "kh" },
];

const basicConfig = {
    appName: "Cloud Tech",
    drawerSize: 250,

    //home server endpoint
    apiUrl: "http://192.168.0.10:5000/api/v1/",
    authUrl: "http://192.168.0.10:5000/auth/",
    fileUrl: "http://192.168.0.10:5000/file/",

    //local endpoint
    // apiUrl: "http://localhost:5000/api/v1/",
    // authUrl: "http://localhost:5000/auth/",
    // fileUrl: "http://localhost:5000/file/",
    // diceBearAvatar: "https://avatars.dicebear.com/api/identicon/",
};

export default basicConfig;