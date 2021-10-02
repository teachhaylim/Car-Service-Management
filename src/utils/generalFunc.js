import { v4 as uuidv4 } from 'uuid';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import basicConfig, { roles } from './basicConfig';

export const getRole = (id) => roles[id];

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

export const checkFile = (file) => {
    if(typeof file == "string" && !file) return ""; 

    if (typeof file == "string") return basicConfig.fileUrl + file;

    if (file instanceof File) return URL.createObjectURL(file);

    return "";
}