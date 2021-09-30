import axios from 'axios';
import { meta } from 'utils/enum';
import store from 'store';
import basicConfig from './basicConfig';

const ApiRequest = axios.create({
    baseURL: basicConfig.apiUrl,
    timeout: 15000
});

ApiRequest.interceptors.request.use(config => {
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

ApiRequest.interceptors.response.use(response => {
    const res = response.data;

    if (res.meta === meta.TOKENEXPIRE) {
        alert("Token Expire, Please Login Again");
    }
    else {
        return res;
    }
},
    error => {
        return Promise.reject(error.response.data)
    }
);

export default ApiRequest;