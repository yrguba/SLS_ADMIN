import http from '../../../service/axiosCustom';
import { API_WATCH_URL } from "../../../constants";

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
    GET_WATCH_ONLINE_SUCCESS,
    GET_WATCH_ONLINE_FAILED,
    CREATE_WATCH_SUCCESS,
    CREATE_WATCH_FAILED,
    CREATE_CHILD_SUCCESS,
    CREATE_CHILD_FAILED,
    DELETE_CHILD_SUCCESS,
    DELETE_CHILD_FAILED,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    CLEAR_STATE
} from "./types";

export const getWatchesSuccess = (data) => {
    return {
        type: GET_WATCHES_SUCCESS,
        payload: data
    }
};

export const getWatchesFailed = (error) => {
    return {
        type: GET_WATCHES_FAILED,
        payload: error
    }
};

export const getUsersSuccess = (data) => {
    return {
        type: GET_WATCH_USERS_SUCCESS,
        payload: data
    }
};

export const getUsersFailed = (error) => {
    return {
        type: GET_WATCH_USERS_FAILED,
        payload: error
    }
};


export const resetPasswordSuccess = (data) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: data
    }
};

export const resetPasswordFailed = (error) => {
    return {
        type: RESET_PASSWORD_FAILED,
        payload: error
    }
};

export const sendMessageSuccess = (data) => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        payload: data
    }
};

export const sendMessageFailed = (error) => {
    return {
        type: SEND_MESSAGE_FAILED,
        payload: error
    }
};

export const watchBindSuccess = (data) => {
    return {
        type: WATCH_BIND_SUCCESS,
        payload: data
    }
};

export const watchBindFailed = (error) => {
    return {
        type: WATCH_BIND_FAILED,
        payload: error
    }
};

export const watchUnbindSuccess = (data) => {
    return {
        type: WATCH_UNBIND_SUCCESS,
        payload: data
    }
};

export const watchUnbindFailed = (error) => {
    return {
        type: WATCH_UNBIND_FAILED,
        payload: error
    }
};

export const removeWatchSuccess = (data) => {
    return {
        type: REMOVE_WATCH_SUCCESS,
        payload: data
    }
};

export const removeWatchFailed = (error) => {
    return {
        type: REMOVE_WATCH_FAILED,
        payload: error
    }
};

export const getWatchOnlineSuccess = (data) => {
    return {
        type: GET_WATCH_ONLINE_SUCCESS,
        payload: data
    }
};

export const getWatchOnlineFailed = (error) => {
    return {
        type: GET_WATCH_ONLINE_FAILED,
        payload: error
    }
};

export const createWatchSuccess = (data) => {
    return {
        type: CREATE_WATCH_SUCCESS,
        payload: data
    }
};

export const createWatchFailed = (error) => {
    return {
        type: CREATE_WATCH_FAILED,
        payload: error
    }
};

export const createChildSuccess = (data) => {
    return {
        type: CREATE_CHILD_SUCCESS,
        payload: data
    }
};

export const createChildFailed = (error) => {
    return {
        type: CREATE_CHILD_FAILED,
        payload: error
    }
};

export const deleteChildSuccess = (data) => {
    return {
        type: DELETE_CHILD_SUCCESS,
        payload: data
    }
};

export const deleteChildFailed = (error) => {
    return {
        type: DELETE_CHILD_FAILED,
        payload: error
    }
};

export const deleteUserSuccess = (data) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: data
    }
};

export const deleteUserFailed = (error) => {
    return {
        type: DELETE_USER_FAILED,
        payload: error
    }
};

export const clearState = () => {
    return {
        type: CLEAR_STATE,
    }
};


export const getWatches = (page = 1, limit = 10, like= '') => {
    return (dispatch) => {
        return http
            .get(`${API_WATCH_URL}/watch?page=${page}&limit=${limit}${like ? `&like=${like}` : '' }`)
            .then((response) => {
                dispatch(getWatchesSuccess(response.data))
            })
            .catch(() => {
                dispatch(getWatchesFailed());
            });
    };
};

export const getUsers = (page = 1, limit = 10, like = '') => {
    return (dispatch) => {
        return http
            .get(`${API_WATCH_URL}/users?page=${page}&limit=${limit}&like=${like}`)
            .then((response) => {
                dispatch(getUsersSuccess(response.data))
            })
            .catch(() => {
                dispatch(getUsersFailed());
            });
    };
};


export const resetPassword = (email) => {
    return (dispatch) => {
        return http
            .post(`${API_WATCH_URL}/auth/send-pass-to-email`, {email: email})
            .then((response) => {
                dispatch(resetPasswordSuccess(response.data))
            })
            .catch(() => {
                dispatch(resetPasswordFailed());
            });
    };
};

export const sendMailToUser = (email, subject, message) => {
    return (dispatch) => {
        return http
            .post(`${API_WATCH_URL}/auth/send-message-to-email`,
                {email: email,
                    subject: subject,
                    message: message
                })
            .then((response) => {
                dispatch(sendMessageSuccess(response.data))
            })
            .catch(() => {
                dispatch(sendMessageFailed());
            });
    };
};

export const bindWatch = (reg_code, child_id, timezone = 3) => {
    return (dispatch) => {
        return http
            .patch(`${API_WATCH_URL}/watch/bind/${child_id}/${reg_code}/${timezone}`)
            .then((response) => {
                dispatch(watchBindSuccess(response.data))
            })
            .catch(() => {
                dispatch(watchBindFailed());
            });
    };
};

export const unbindWatch = (reg_code, child_id) => {
    return (dispatch) => {
        return http
            .patch(`${API_WATCH_URL}/watch/unbind/${child_id}/${reg_code}`)
            .then((response) => {
                dispatch(watchUnbindSuccess(response.data))
            })
            .catch(() => {
                dispatch(watchUnbindFailed());
            });
    };
};

export const removeWatch = (reg_code) => {
    return (dispatch) => {
        return http
            .delete(`${API_WATCH_URL}/watch/remove/${reg_code}`)
            .then((response) => {
                dispatch(removeWatchSuccess(response.data))
            })
            .catch(() => {
                dispatch(removeWatchFailed());
            });
    };
};

export const getWatchesOnline = () => {
    return (dispatch) => {
        return http
            .get(`${API_WATCH_URL}/watch/watch/is_online`)
            .then((response) => {
                dispatch(getWatchOnlineSuccess(response.data))
            })
            .catch(() => {
                dispatch(getWatchOnlineFailed());
            });
    };
};

export const createWatch = (data) => {
    data.is_online = true;
    return (dispatch) => {
        return http
            .post(`${API_WATCH_URL}/watch/create`, data)
            .then((response) => {
                dispatch(createWatchSuccess(response.data))
            })
            .catch(() => {
                dispatch(createWatchFailed());
            });
    };
};

export const createChild = (parentId, data) => {
    return (dispatch) => {
        return http
            .post(`${API_WATCH_URL}/children/${parentId}`, data)
            .then((response) => {
                dispatch(createChildSuccess(response.data))
            })
            .catch(() => {
                dispatch(createChildFailed());
            });
    };
};

export const deleteChild = (id, regCode) => {
    return (dispatch) => {
        return http
            .delete(`${API_WATCH_URL}/children/${id}/${regCode}`)
            .then((response) => {
                dispatch(deleteChildSuccess(response.data))
            })
            .catch(() => {
                dispatch(deleteChildFailed());
            });
    };
};

export const deleteUser = (id) => {
    return (dispatch) => {
        return http
            .delete(`${API_WATCH_URL}/users/${id}`)
            .then((response) => {
                dispatch(deleteUserSuccess(response.data))
            })
            .catch(() => {
                dispatch(deleteUserFailed());
            });
    };
};
