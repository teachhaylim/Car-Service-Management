import { createStore } from "redux";
import Cookies from "universal-cookie";

//Action type variable
const SET_USER_INFO = "SET_USER_INFO";
const SET_SHOP_INFO = "SET_SHOP_INFO";
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";
const SET_IS_LOGIN = "SET_IS_LOGIN";
const SET_ROLE = "SET_ROLE";

//Store Section
const initialState = {
    user: {},
    shop: {},
    token: new Cookies().get("XTOK") || "",
    isLogin: false,
    role: 0, // 0 = user role (not allow access at all), 1 = admin (allow access related info), 2 = superadmin (God level access xd)
};

//Action Section aka Action Creator
export const SetUserInfo = (userObject) => ({
    type: SET_USER_INFO,
    user: userObject,
});

export const SetShopInfo = (shopObject) => ({
    type: SET_SHOP_INFO,
    shop: shopObject,
});

export const SetToken = (token) => ({
    type: SET_TOKEN,
    token: token,
});

export const RemoveToken = () => ({
    type: REMOVE_TOKEN,
});

export const SetRole = (role) => ({
    type: SET_ROLE,
    role: role,
});

export const SetIsLogin = (isLogin) => ({
    type: SET_IS_LOGIN,
    isLogin: isLogin,
});

//Reducer Section
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, user: action.user };
        case SET_SHOP_INFO:
            return { ...state, shop: action.shop };
        case SET_TOKEN:
            return { ...state, token: action.token };
        case REMOVE_TOKEN:
            return { ...state, token: "" };
        case SET_ROLE:
            return { ...state, role: action.role };
        case SET_IS_LOGIN:
            return { ...state, isLogin: action.isLogin };
        default:
            return state;
    }
};

export default createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for redux dev tool
);