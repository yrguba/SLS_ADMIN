import http from '../../../service/axiosCustom';
import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_USERS_DEVICES_SUCCESS,
    GET_USERS_DEVICES_FAILED,
    UNLINK_DEVICE_SUCCESS,
    UNLINK_DEVICE_FAILED,
    ADD_PERMISSIONS_SUCCESS,
    ADD_PERMISSIONS_FAILED,
    GET_PERMISSIONS_SUCCESS,
    GET_PERMISSIONS_FAILED,
    GET_USER_PERMISSIONS_SUCCESS,
    GET_USER_PERMISSIONS_FAILED,
} from "./types";
import { API_URL } from "../../../constants";

export const getUsersSuccess = (data) => {
    return {
        type: GET_USERS_SUCCESS,
        payload: data.data,
        pagination: data.paging
    }
};

export const getUsersFailed = (error) => {
    return {
        type: GET_USERS_FAILED,
        payload: error
    }
};

export const getUsersDevicesSuccess = (data) => {
    return {
        type: GET_USERS_DEVICES_SUCCESS,
        payload: data.data,
        pagination: data.paging
    }
};

export const getUsersDevicesFailed = (error) => {
    return {
        type: GET_USERS_DEVICES_FAILED,
        payload: error
    }
};

export const unlinkDeviceFromUserSuccess = () => {
    return {
        type: UNLINK_DEVICE_SUCCESS,
    }
};

export const unlinkDeviceFromUserFailed = (error) => {
    return {
        type: UNLINK_DEVICE_FAILED,
        payload: error
    }
};

export const changePermissionsSuccess = () => {
    return {
        type: ADD_PERMISSIONS_SUCCESS,
    }
};

export const changePermissionsFailed = (error) => {
    return {
        type: ADD_PERMISSIONS_FAILED,
    }
};

export const getUserPermissionsSuccess = (data) => {
    return {
        type: GET_USER_PERMISSIONS_SUCCESS,
        payload: data.data,
    }
};

export const getUserPermissionsFailed = (error) => {
    return {
        type: GET_USER_PERMISSIONS_FAILED,
    }
};

export const getPermissionsSuccess = (data) => {
    return {
        type: GET_PERMISSIONS_SUCCESS,
        payload: data.data,
    }
};

export const getPermissionsFailed = (error) => {
    return {
        type: GET_PERMISSIONS_FAILED,
    }
};


export const getUsers = (page = 0, size = 10, email_like) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/users/?page=${page}&size=${size}${email_like ? `&email_like=${email_like}` : ''}`)
            .then((response) => {
                dispatch(getUsersSuccess(response.data));
            })
            .catch(() => {
                dispatch(getUsersFailed());
            });
    }
};

export const getDevicesByUser = (id) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/users/${id}/devices`)
            .then((response) => {
                dispatch(getUsersDevicesSuccess(response.data));
            })
            .catch(() => {
                dispatch(getUsersDevicesFailed());
            });
    }
};

export const unlinkDeviceFromUser = (t_id) => {
    return (dispatch) => {
        return http
            .delete(`${API_URL}/devices/${t_id}`)
            .then((response) => {
                dispatch(unlinkDeviceFromUserSuccess(response.data));
            })
            .catch(() => {
                dispatch(unlinkDeviceFromUserFailed());
            });
    }
};

export const getPermissions = () => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/user-scopes`)
            .then((response) => {
                dispatch(getPermissionsSuccess(response.data));
            })
            .catch(() => {
                dispatch(getPermissionsFailed());
            });
    }
};

export const getUserPermissions = (userId) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/users/${userId}/scopes`)
            .then((response) => {
                dispatch(getUserPermissionsSuccess(response.data));
            })
            .catch(() => {
                dispatch(getUserPermissionsFailed());
            });
    }
};

export const changePermissions = (userId, permissions) => {
    return (dispatch) => {
        return http
            .post(`${API_URL}/users/${userId}/scopes`, {scopes: permissions})
            .then((response) => {
                dispatch(changePermissionsSuccess(response.data));
            })
            .catch(() => {
                dispatch(changePermissionsFailed());
            });
    }
};
