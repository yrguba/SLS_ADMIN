import {
    GET_DEVICES_CATEGORIES_SUCCESS,
    GET_DEVICES_CATEGORIES_FAILED,
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILED,
    CREATE_DEVICES_CATEGORIES_SUCCESS,
    CREATE_DEVICES_CATEGORIES_FAILED,
    CREATE_DEVICE_SUCCESS,
    CREATE_DEVICE_FAILED,
    UPDATE_DEVICE_SUCCESS,
    UPDATE_DEVICE_FAILED
} from "./types";

const initialState = {
    categories: null,
    devices: null,
};

export function devicesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DEVICES_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                devices_categories_updated: false,
                error: null,
            };
        case GET_DEVICES_CATEGORIES_FAILED:
            return {
                ...state,
                categories: null,
                error: true,
            };
        case GET_DEVICES_SUCCESS:
            return {
                ...state,
                devices: action.payload,
                devices_updated: false,
                error: null,
            };
        case GET_DEVICES_FAILED:
            return {
                ...state,
                devices: null,
                error: true,
            };
        case CREATE_DEVICES_CATEGORIES_SUCCESS:
            return {
                ...state,
                devices_categories_updated: true,
                error: null,
            };
        case CREATE_DEVICES_CATEGORIES_FAILED:
            return {
                ...state,
                devices_categories_updated: false,
                error: true,
            };
        case CREATE_DEVICE_SUCCESS:
            return {
                ...state,
                devices_updated: true,
                error: null,
            };
        case CREATE_DEVICE_FAILED:
            return {
                ...state,
                devices_updated: false,
                error: true,
            };
        case UPDATE_DEVICE_SUCCESS:
            return {
                ...state,
                devices_updated: true,
                error: null,
            };
        case UPDATE_DEVICE_FAILED:
            return {
                ...state,
                devices_updated: false,
                error: true,
            };

        default:
            return state;
    }
}

export default devicesReducer;
