import { createStore } from "redux";

const SET_USER_INFO = "SET_USER_INFO";
const SET_SHOP_INFO = "SET_SHOP_INFO";
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";

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

//Store Section
const initialState = {
    user: {},
    shop: {},
    token: "",
};

//Reducer Section
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, user: action.user};
        case SET_SHOP_INFO:
            return { ...state, shop: action.shop };
        case SET_TOKEN:
            return { ...state, token: action.token };
        case REMOVE_TOKEN:
            return { ...state, token: "" };
        default:
            return state;
    }
}

export default createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);