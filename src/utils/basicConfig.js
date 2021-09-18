import { AddToQueue, Dashboard, People, Star, Store, TableChart, VerticalSplit } from "@material-ui/icons";
import { v4 as uuidv4 } from 'uuid';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';

const roles = ["user", "admin", "super admin"];

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

export const generateDiceBearAvatar = (key = uuidv4()) => {
    const avatar = createAvatar(style, {
        seed: key,
    });

    return avatar;
};

export const getDiceBearAvatar = (key) => {
    if (!key) return "";

    return `${basicConfig.diceBearAvatar}${key}.svg`;
};

export const getRole = (id) => roles[id];

const basicConfig = {
    appName: "Cloud Tech",
    drawerSize: 250,
    apiUrl: "http://localhost:5000/api/v1",
    fileUrl: "http://localhost:5000/file/",
    diceBearAvatar: "https://avatars.dicebear.com/api/identicon/",
};

export default basicConfig;