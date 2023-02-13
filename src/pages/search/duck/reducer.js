import {
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILED,
    DELETE_FROM_TUYA_SUCCESS,
    DELETE_FROM_TUYA_FAILED,
    DELETE_FROM_TUYA_CLEAR_STATE,
} from "./types";

const initialState = {
    devices: null,
    deleted_from_tuya: null,
};

export function searchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DEVICES_SUCCESS:
            return {
                ...state,
                devices: action.payload,
                error: null,
            };
        case GET_DEVICES_FAILED:
            return {
                ...state,
                devices: null,
                error: true,
            };
        case DELETE_FROM_TUYA_SUCCESS:
            return {
                ...state,
                deleted_from_tuya: "success",
                error: null,
            };
        case DELETE_FROM_TUYA_FAILED:
            return {
                ...state,
                deleted_from_tuya: "failed",
                error: true,
            };
        case DELETE_FROM_TUYA_CLEAR_STATE:
            return {
                ...state,
                deleted_from_tuya: null,
            };
        default:
            return state;
    }
}

export default searchReducer;
