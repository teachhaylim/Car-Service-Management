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

import axios from 'axios'; //FIXME package missing
import serverConfig from './basicConfig';
import { meta } from '@/utils/enum'; //FIXME wrong import

const service = axios.create({
    baseURL: serverConfig.api_url,
    timeout: 15000
});

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRvYiI6bnVsbCwiZ2VuZGVyIjoiIiwicGhvbmVudW1iZXIiOiIiLCJhZGRyZXNzIjpbXSwiYXZhdGFyIjoiaHR0cHM6Ly93d3cud29ybGRmdXR1cmVjb3VuY2lsLm9yZy93cC1jb250ZW50L3VwbG9hZHMvMjAyMC8wNi9ibGFuay1wcm9maWxlLXBpY3R1cmUtOTczNDYwXzEyODAtMS5wbmciLCJpc19hY3RpdmUiOnRydWUsImxvZ2luX2lwIjoiOjoxIiwiY3JlYXRlZF9kYXRlIjoiMjAyMS0wNy0wOFQxMzoxODo0Mi4yMjVaIiwiaXNfZ29vZ2xlIjpmYWxzZSwiaXNfZmFjZWJvb2siOmZhbHNlLCJsYXN0X2xvZ2luIjoiMjAyMS0wNy0wOFQxMzoxOToxOS4yOTNaIiwiaXNfY3VzdG9tZXIiOnRydWUsInBhc3N3b3JkIjoiJDJiJDEwJDVIby5sY1UwdnhNQzdEdmxPU0dHZHU5T25reDZDT0xQMGt1R0Jwa0VPcWNqWXJsYy9ScWZlIiwiX2lkIjoiNjBlNmZiMzJiZWIxNDEyNDQ4OGFhMTRmIiwidXNlcm5hbWUiOiJoZWxlbiIsImVtYWlsIjoiaGVsZW5AZ21haWwuY29tIiwibGFzdG5hbWUiOiJEYWxlIiwiZmlyc3RuYW1lIjoiSGVsZW4ifSwiaWF0IjoxNjI1NzUwMzU5LCJleHAiOjE2MjY2MTQzNTl9.bRYNxjLMPJMxG_Zw87c5S0CwfVU3BvPcIvuZzI1oMMc";

service.interceptors.request.use(config => {
    config.headers['Authorization'] = token;
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

    if (res.meta == meta.TOKENEXPIRE) { //FIXME React uses === to check comparison
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