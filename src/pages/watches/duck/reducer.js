import {
    GET_WATCHES_SUCCESS,
    GET_WATCHES_FAILED,
    GET_WATCH_USERS_FAILED,
    GET_WATCH_USERS_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED,
    WATCH_BIND_SUCCESS,
    WATCH_BIND_FAILED,
    WATCH_UNBIND_SUCCESS,
    WATCH_UNBIND_FAILED,
    REMOVE_WATCH_SUCCESS,
    REMOVE_WATCH_FAILED,
    CLEAR_STATE,
    GET_WATCH_ONLINE_SUCCESS,
    CREATE_WATCH_SUCCESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    CREATE_CHILD_SUCCESS,
    DELETE_CHILD_SUCCESS,
    DELETE_CHILD_FAILED,
} from "./types";

const initialState = {
    watches: null,
};

export function watchesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WATCHES_SUCCESS:
            return {
                ...state,
                watches: action.payload,
                error: null,
            };
        case GET_WATCHES_FAILED:
            return {
                ...state,
                watches: null,
                error: true,
            };
        case GET_WATCH_USERS_SUCCESS:
            return {
                ...state,
                watch_users: action.payload,
                error: null,
            };
        case GET_WATCH_USERS_FAILED:
            return {
                ...state,
                watch_users: null,
                error: true,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                reset_status: 'success',
                error: null,
            };
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                reset_status: 'failed',
                error: true,
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                response: action.payload,
                send_status: 'success',
                error: null,
            };
        case SEND_MESSAGE_FAILED:
            return {
                ...state,
                send_status: 'failed',
                error: true,
            };
        case WATCH_BIND_SUCCESS:
            return {
                ...state,
                bind_status: 'success',
                error: null,
            };
        case WATCH_BIND_FAILED:
            return {
                ...state,
                bind_status: 'failed',
                error: true,
            };
        case WATCH_UNBIND_SUCCESS:
            return {
                ...state,
                unbind_status: 'success',
                error: null,
            };
        case WATCH_UNBIND_FAILED:
            return {
                ...state,
                unbind_status: 'failed',
                error: true,
            }
        case REMOVE_WATCH_SUCCESS:
            return {
                ...state,
                remove_status: 'success',
                error: null,
            };
        case REMOVE_WATCH_FAILED:
            return {
                ...state,
                remove_status: 'failed',
                error: true,
            }
        case GET_WATCH_ONLINE_SUCCESS:
            return {
                ...state,
                watches_online: action.payload,
                error: false,
            }
        case CREATE_WATCH_SUCCESS:
            return {
                ...state,
                watches_created: action.payload,
                error: false,
            }
        case CREATE_CHILD_SUCCESS:
            return {
                ...state,
                child_created: action.payload,
                error: false,
            }
        case DELETE_CHILD_SUCCESS:
            return {
                ...state,
                delete_child_status: 'success',
                error: false,
            }
        case DELETE_CHILD_FAILED:
            return {
                ...state,
                delete_child_status: 'failed',
                error: true,
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                delete_user_status: 'success',
                error: false,
            }
        case DELETE_USER_FAILED:
            return {
                ...state,
                delete_user_status: 'failed',
                error: true,
            }
        case CLEAR_STATE:
            return {
                ...state,
                reset_status: null,
                send_status: null,
                bind_status: null,
                unbind_status: null,
                remove_status: null,
                error: null,
            };
        default:
            return state;
    }
}

export default watchesReducer;
