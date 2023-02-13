import http from '../../../service/axiosCustom';
import { API_URL } from "../../../constants";

import {
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILED,
    CREATE_DEVICE_SUCCESS,
    CREATE_DEVICE_FAILED,
    UPDATE_DEVICE_SUCCESS,
    UPDATE_DEVICE_FAILED,
    GET_DEVICES_CATEGORIES_SUCCESS,
    GET_DEVICES_CATEGORIES_FAILED,
    CREATE_DEVICES_CATEGORIES_SUCCESS,
    CREATE_DEVICES_CATEGORIES_FAILED,
} from "./types";

export const getDevicesSuccess = (data) => {
    return {
        type: GET_DEVICES_SUCCESS,
        payload: data
    }
};

export const getDevicesFailed = (error) => {
    return {
        type: GET_DEVICES_FAILED,
        payload: error
    }
};

export const createDeviceSuccess = (data) => {
    return {
        type: CREATE_DEVICE_SUCCESS,
        payload: data
    }
};

export const createDeviceFailed = (error) => {
    return {
        type: CREATE_DEVICE_FAILED,
        payload: error
    }
};

export const updateDeviceSuccess = (data) => {
    return {
        type: UPDATE_DEVICE_SUCCESS,
        payload: data
    }
};

export const updateDeviceFailed = (error) => {
    return {
        type: UPDATE_DEVICE_FAILED,
        payload: error
    }
};

export const getDevicesCategoriesSuccess = (data) => {
    return {
        type: GET_DEVICES_CATEGORIES_SUCCESS,
        payload: data
    }
};

export const getDevicesCategoriesFailed = (error) => {
    return {
        type: GET_DEVICES_CATEGORIES_FAILED,
        payload: error
    }
};

export const createDevicesCategoriesSuccess = (data) => {
    return {
        type: CREATE_DEVICES_CATEGORIES_SUCCESS,
        payload: data
    }
};

export const createDevicesCategoriesFailed = (error) => {
    return {
        type: CREATE_DEVICES_CATEGORIES_FAILED,
        payload: error
    }
};

export const getDevices = () => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/products/`)
            .then((response) => {
                dispatch(getDevicesSuccess(response.data))
            })
            .catch(() => {
                dispatch(getDevicesFailed());
            });
    };
};

export const createDevice = (deviceData) => {
    return (dispatch) => {
        return http
            .post(`${API_URL}/products`, deviceData)
            .then((response) => {
                dispatch(createDeviceSuccess(response.data))
            })
            .catch(() => {
                dispatch(createDeviceFailed());
            });
    };
};

export const updateDevice = (id, deviceData) => {
    return (dispatch) => {
        return http
            .patch(`${API_URL}/products/${id}`, deviceData)
            .then((response) => {
                dispatch(updateDeviceSuccess(response.data))
            })
            .catch(() => {
                dispatch(updateDeviceFailed());
            });
    };
};

export const getDevicesCategories = () => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/device-categories`)
            .then((response) => {
                dispatch(getDevicesCategoriesSuccess(response.data))
            })
            .catch(() => {
                dispatch(getDevicesCategoriesFailed());
            });
    };
};

export const createCategory = (categoryData) => {
    return (dispatch) => {
        return http
            .post(`${API_URL}/device-categories`, categoryData)
            .then((response) => {
                dispatch(createDevicesCategoriesSuccess(response.data))
            })
            .catch(() => {
                dispatch(createDevicesCategoriesFailed());
            });
    };
};

export const updateCategory = (id, categoryData) => {
    return (dispatch) => {
        return http
            .patch(`${API_URL}/device-categories/${id}`, categoryData)
            .then((response) => {
                dispatch(createDevicesCategoriesSuccess(response.data))
            })
            .catch(() => {
                dispatch(createDevicesCategoriesFailed());
            });
    };
};
