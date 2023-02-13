import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import {API_HOST, SECRET_REFRESH} from "../constants";

const cookies = new Cookies();

export const _getRefreshToken = () => {
    return cookies.get('refresh_token', { path: '/', domain: window.location.hostname });
};

export const _refreshToken = () => {
    const refreshToken = _getRefreshToken();
    if (refreshToken) {
        const refreshData = Object.assign({ refresh_token: refreshToken }, SECRET_REFRESH);
        axios.post(`${API_HOST}/oauth/token`, JSON.stringify(refreshData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                _setTokens(response.data);
                console.debug('token was refreshed');
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }
};

export const _removeTokens = () => {
    cookies.remove('access_token', { path: '/', domain: window.location.hostname });
    cookies.remove('refresh_token', { path: '/', domain: window.location.hostname });
};

export const logOut = () => {
    _removeTokens();
    window.location.href = '/login';
};

export const _setTokens = (tokens) => {
    const expiresIn = tokens.expires_in || 604800;
    const timestampNow = Math.floor(Date.now() / 1000);
    const expireDate = timestampNow + expiresIn;
    cookies.set('access_token', tokens.access_token, {path: '/', domain: window.location.hostname});
    cookies.set('refresh_token', tokens.refresh_token, {path: '/', domain: window.location.hostname});
    cookies.set('expire_date', expireDate, {path: '/', domain: window.location.hostname});
};

export const _getAccessToken = () => {
    const accessToken = cookies.get('access_token', { path: '/', domain: window.location.hostname });

    /* Проверяем не просрочен ли токен
    * В случае его просроченности, обновляем с помощью refresh_token */
    if (accessToken) {
        const expireDate = jwt(accessToken).iat + 86400;

        const timestampNow = Math.floor(Date.now() / 1000);
        if (timestampNow >= expireDate) {
            _refreshToken();
        }
    } else {
        return null;
    }

    return cookies.get('access_token', { path: '/', domain: window.location.hostname });
};

export const _setClient = (email) => {
    localStorage.setItem('client_email', email);
}

export const _getClient = () => {
    return localStorage.getItem('client_email');
}

export const _isLoggedIn = () => {
    return !!_getAccessToken();
};
