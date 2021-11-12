import axios from 'axios';
import { meta } from 'utils/enum';
import store from 'store';
import basicConfig from './basicConfig';

const FileRequest = axios.create({
    baseURL: basicConfig.fileUrl,
    timeout: 15000
});

FileRequest.interceptors.request.use(
    config => {
        config.headers['Authorization'] = store.getState().token;
        config.headers["Accept"] = "multipart/form-data";

        return config
    },
    error => {
        Promise.reject(error)
    }
);

FileRequest.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.meta === meta.TOKENEXPIRE) {
            alert("Token Expire, Please Login Again");
        }
        else {
            return res;
        }
    },
    error => {
        return Promise.reject(error.response.data);
    },
);

export default FileRequest;