import axios from 'axios';
import Cookies from 'universal-cookie';
import {API_HOST, SECRET} from "../constants";
import {getTokenFailed, getTokenSuccess} from "../pages/login/duck/actions";

const cookies = new Cookies();
const http = axios.create();

http.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        return http.request(error.response.config);
    }
    return Promise.reject(error);
});

/* Подставляет Bearer Token в каждый запрос */
http.interceptors.request.use((config) => {
    const token = cookies.get('access_token', { path: '/', domain: window.location.hostname });
    if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = 'application/json';
    }
    return config;
}, undefined);

export default http;
