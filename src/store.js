import { combineReducers, createStore } from "redux";

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

//Reducer Section
const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return action.user;
        default:
            return state;
    };
};

const ShopReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_SHOP_INFO:
            return action.shop;
        default:
            return state;
    };
};

const TokenReducer = (state = "", action) => {
    switch(action.type){
        case SET_TOKEN:
            return "Token set";
        case REMOVE_TOKEN:
            return "Token removed";
        default: 
            return state;
    }
}

//Reducers Config
const reducers = combineReducers({
    user: UserReducer,
    shop: ShopReducer,
    token: TokenReducer,
})

//Store Section
const initialState = {
    user: {
        name: "teachhay",
    },
    shop: {},
    token: "",
}

export default createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);