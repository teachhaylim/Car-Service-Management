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


export const getImage = (filename) => {

};