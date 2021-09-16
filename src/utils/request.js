/**
 * TODO
 *  config pre-defined request here
 * 
 * it will contain destination, payload from other routes as params,
 * destination contain config from basicConfig, api_url + param (destination)
 * 
 * @param destination - check default just in case
 * @param payload
 * 
 * others logic
 * - return "data" from response by server back
 * - check token (jwt) expired
 * - others
 */

import axios from 'axios';
import { meta } from 'utils/enum';
import store from 'store';
import basicConfig from './basicConfig';

const service = axios.create({
    baseURL: basicConfig.apiUrl,
    timeout: 15000
});

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTM0ODUyNmUwNTM4ODY1YWM1ZjIwYjYiLCJpYXQiOjE2MzE3MTY0NjZ9.LbMNWTViUIvvGPpsf8R4OfG8vkJXVDqCTLQ0Nh0sC5w";

service.interceptors.request.use(config => {
    config.headers['Authorization'] = store.getState().token || token;
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

service.interceptors.response.use(response => {
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

//TODO service for handling file upload and get file

export default service;