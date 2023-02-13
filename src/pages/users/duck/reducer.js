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
    GET_USER_PERMISSIONS_FAILED
} from "./types";

const initialState = {
    users: null,
    permissions_changed: false,
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                pagination: action.pagination,
                permissions_changed: false,
                error: null,
            };
        case GET_USERS_FAILED:
            return {
                ...state,
                users: null,
                pagination: null,
                error: true,
            };
        case GET_USERS_DEVICES_SUCCESS:
            return {
                ...state,
                users_devices: action.payload,
                pagination: action.pagination,
                device_unlink: false,
                error: null,
            };
        case GET_USERS_DEVICES_FAILED:
            return {
                ...state,
                users_devices: null,
                pagination: null,
                error: true,
            };
        case UNLINK_DEVICE_SUCCESS:
            return {
                ...state,
                device_unlink: true
            }

        case UNLINK_DEVICE_FAILED:
            return {
                ...state,
                device_unlink: false
            }
        case ADD_PERMISSIONS_SUCCESS:
            return {
                ...state,
                permissions_changed: true
            }

        case ADD_PERMISSIONS_FAILED:
            return {
                ...state,
                permissions_changed: false
            }
        case GET_PERMISSIONS_SUCCESS:
            return {
                ...state,
                permissions: action.payload,
            }

        case GET_PERMISSIONS_FAILED:
            return {
                ...state,
                permissions: null
            }
        case GET_USER_PERMISSIONS_SUCCESS:
            return {
                ...state,
                user_permissions: action.payload,
            }

        case GET_USER_PERMISSIONS_FAILED:
            return {
                ...state,
                user_permissions: null
            }

        default:
            return state;
    }
}

export default usersReducer;
