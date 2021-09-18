import axios from 'axios';
import { meta } from 'utils/enum';
import store from 'store';
import basicConfig from './basicConfig';

console.log(basicConfig);

const service = axios.create({
    baseURL: "localhost:5000/api/v1",
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