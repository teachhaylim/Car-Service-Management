import axios from 'axios';
import store from 'store';
import basicConfig from './basicConfig';

const AuthRequest = axios.create({
    baseURL: basicConfig.authUrl,
    timeout: 15000
});

AuthRequest.interceptors.request.use(
    config => {
        config.headers['Authorization'] = store.getState().token;
        config.headers['Content-Type'] = 'application/json';

        if (config.method === 'post') {
            config.data = JSON.stringify(config.data);
        }

        return config
    },
    error => {
        Promise.reject(error)
    }
);

AuthRequest.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.meta === 4001) {
            alert("Token Expire, Please Login Again");
            //FIXME redirect to login page
        }
        else {
            return res;
        }
    },
    error => {
        return Promise.reject(error.response.data);
    },
);

export default AuthRequest;