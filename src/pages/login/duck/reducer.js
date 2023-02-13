import {
    GET_TOKENS_SUCCESS,
    GET_TOKENS_FAILED
} from "./types";

const initialState = {
    access_token: null,
    refresh_token: null,
    expires_in: null
};

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOKENS_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: action.payload.expires_in,
                error: null,
            };
        case GET_TOKENS_FAILED:
            return {
                ...state,
                access_token: null,
                refresh_token: null,
                expires_in:null,
                error: true,
            };
        default:
            return state;
    }
}

export default loginReducer;
