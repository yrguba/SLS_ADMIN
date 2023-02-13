import http from "../../../service/axiosCustom";
import { API_URL } from "../../../constants";
import {
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILED,
    DELETE_FROM_TUYA_SUCCESS,
    DELETE_FROM_TUYA_FAILED,
    DELETE_FROM_TUYA_CLEAR_STATE,
} from "./types";

export const getDevicesSuccess = (data) => {
    return {
        type: GET_DEVICES_SUCCESS,
        payload: data.data,
    }
};

export const getDevicesFailed = (error) => {
    return {
        type: GET_DEVICES_FAILED,
        payload: error
    }
};

export const deleteFromTuyaSuccess = (data) => {
    return {
        type: DELETE_FROM_TUYA_SUCCESS,
        payload: data.data,
    }
};

export const deleteFromTuyaFailed = (error) => {
    return {
        type: DELETE_FROM_TUYA_FAILED,
        payload: error
    }
};


export const deleteFromTuyaClearState = () => {
    return {
        type: DELETE_FROM_TUYA_CLEAR_STATE,
    }
};

export const searchDevices = (id) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/search/devices/${id}`)
            .then((response) => {
                dispatch(getDevicesSuccess(response.data));
            })
            .catch(() => {
                dispatch(getDevicesFailed());
            });
    }
};

export const deleteFromTuya = (id) => {
    return (dispatch) => {
        return http
            .delete(`${API_URL}/unknown-devices/${id}`)
            .then((response) => {
                dispatch(deleteFromTuyaSuccess(response.data));
            })
            .catch(() => {
                dispatch(deleteFromTuyaFailed());
            });
    }
};
