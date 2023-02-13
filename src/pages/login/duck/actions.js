import axios from 'axios';
import { API_HOST, SECRET, SECRET_REFRESH } from "../../../constants";

import {
    GET_TOKENS_SUCCESS,
    GET_TOKENS_FAILED
} from "./types";

export const getTokenSuccess = (data) => {
    return {
        type: GET_TOKENS_SUCCESS,
        payload: data
    }
};

export const getTokenFailed = (error) => {
    return {
        type: GET_TOKENS_FAILED,
        payload: error
    }
};

export const getTokens = (data) => {
    const authData = Object.assign(data, SECRET);
    return (dispatch) => {
        return axios
            .post(`${API_HOST}/oauth/token`, JSON.stringify(authData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                dispatch(getTokenSuccess(response.data));
            })
            .catch(() => {
                dispatch(getTokenFailed());
            });
    };
};

