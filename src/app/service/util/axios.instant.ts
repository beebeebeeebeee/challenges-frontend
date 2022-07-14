import _axios from "axios";
import { requestErrorHandler } from "./request.hander";

const axios = _axios.create();

axios.interceptors.request.use(
    function (config) {
    
        return config;
    },
    function (error) {
    
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.data != null) {
            requestErrorHandler(error.response.data.msg)
            return Promise.resolve(error.response)
        }
        if (!window.navigator.onLine) {
            alert("網路出了點問題，請重新連線後重整網頁");
            return;
        }
        return Promise.reject(error);
    }
);

export default axios