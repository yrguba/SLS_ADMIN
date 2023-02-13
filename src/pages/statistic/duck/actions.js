import http from '../../../service/axiosCustom';
import {API_URL, TUYA_URL} from "../../../constants";

import {
    GET_STATISTIC_SUCCESS,
    GET_STATISTIC_FAILED,
    GET_SPECS_SUCCESS,
    GET_SPECS_FAILED,
    GET_DEVICES_STATS_SUCCESS,
    GET_DEVICES_STATS_FAILED,
    TRIGGER_STATS_SEND_SUCCESS,
    TRIGGER_STATS_SEND_FAILED,
    GET_STATISTIC_REPORTS_SUCCESS,
    GET_STATISTIC_REPORTS_FAILED,
    GET_STATISTIC_REPORT_SUCCESS,
    GET_STATISTIC_REPORT_FAILED,
    UPDATE_STATISTIC_REPORT_SUCCESS,
    UPDATE_STATISTIC_REPORT_FAILED,
    DELETE_STATISTIC_REPORT_SUCCESS,
    DELETE_STATISTIC_REPORT_FAILED,
    CLEAR_DELETE_STATISTIC_REPORT,
    CLEAR_UPDATE_STATISTIC_REPORT,
    CLEAR_STATISTIC_REPORT_ERROR,
    SET_STATISTIC_LOADING,
    CLEAR_STATS_SEND_SUCCESS,
} from "./types";

export const getStatisticSuccess = (data) => {
    return {
        type: GET_STATISTIC_SUCCESS,
        payload: data
    }
};

export const getStatisticFailed = (error) => {
    return {
        type: GET_STATISTIC_FAILED,
        payload: error
    }
};

export const getSpecsSuccess = (data) => {
    return {
        type: GET_SPECS_SUCCESS,
        payload: data
    }
};

export const getSpecsFailed = (error) => {
    return {
        type: GET_SPECS_FAILED,
        payload: error
    }
};

export const getDevicesStatSuccess = (data) => {
    return {
        type: GET_DEVICES_STATS_SUCCESS,
        payload: data
    }
};

export const getDevicesStatFailed = (error) => {
    return {
        type: GET_DEVICES_STATS_FAILED,
        payload: error
    }
};

export const triggerStatisticSendSuccess = (data) => {
    return {
        type: TRIGGER_STATS_SEND_SUCCESS,
        payload: data
    }
};

export const triggerStatisticSendFailed = (error) => {
    console.log('error')
    return {
        type: TRIGGER_STATS_SEND_FAILED,
        payload: error
    }
};

export const getStatisticReportsSuccess = (data) => {
    return {
        type: GET_STATISTIC_REPORTS_SUCCESS,
        payload: data
    }
};

export const getStatisticReportsFailed = (error) => {
    return {
        type: GET_STATISTIC_REPORTS_FAILED,
        payload: error
    }
};

export const getStatisticReportSuccess = (data) => {
    return {
        type: GET_STATISTIC_REPORT_SUCCESS,
        payload: data
    }
};

export const getStatisticReportFailed = (error) => {
    return {
        type: GET_STATISTIC_REPORT_FAILED,
        payload: error
    }
};

export const updateStatisticReportSuccess = (data) => {
    return {
        type: UPDATE_STATISTIC_REPORT_SUCCESS,
        payload: data
    }
};

export const updateStatisticReportFailed = (error) => {
    return {
        type: UPDATE_STATISTIC_REPORT_FAILED,
        payload: error
    }
};

export const deleteStatisticReportSuccess = (data) => {
    return {
        type: DELETE_STATISTIC_REPORT_SUCCESS,
        payload: data
    }
};

export const deleteStatisticReportFailed = (error) => {
    return {
        type: DELETE_STATISTIC_REPORT_FAILED,
        payload: error
    }
};

export const clearReportDeletedState = () => {
    return {
        type: CLEAR_DELETE_STATISTIC_REPORT,
    }
};

export const clearReportUpdatedState = () => {
    return {
        type: CLEAR_UPDATE_STATISTIC_REPORT,
    }
};

export const clearReportErrorState = () => {
    return {
        type: CLEAR_STATISTIC_REPORT_ERROR,
    }
};

export const clearReportSendState = () => {
    return {
        type: CLEAR_STATS_SEND_SUCCESS,
    }
};

export const setStatisticLoading = () => {
    return {
        type: SET_STATISTIC_LOADING,
    }
};

export const getStatistic = (until = parseInt(Date.now() / 1000), since = 1273690114) => {
    return (dispatch) => {
        dispatch(setStatisticLoading(false));
        return http
            .get(`${API_URL}/stats/current?until=${until}&since=${since}`)
            .then((response) => {
                dispatch(getStatisticSuccess(response.data));
            })
            .catch(() => {
                dispatch(getStatisticFailed());
            });
    };
};

export const getSpecs = (homeId, deviceId) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/homes/${homeId}/devices/${deviceId}/specifications`)
            .then((response) => {
                dispatch(getSpecsSuccess(response.data));
            })
            .catch(() => {
                dispatch(getSpecsFailed());
            });
    };
};

export const getDevicesStat = (categoryId, productId, since = 1273690114, until = parseInt(Date.now() / 1000)) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/stats/devices?category_id=${categoryId}&product_id=${productId}&since=${since}&until=${until}&after_id=0`)
            .then((response) => {
                dispatch(getDevicesStatSuccess(response.data));
            })
            .catch(() => {
                dispatch(getDevicesStatFailed());
            });
    };
};

export const triggerStatisticSend = (delivery, statistic) => {
    return (dispatch) => {
        return http
            .post(`${API_URL}/stats-emails/send`, {
                delivery: delivery, statistics: statistic
            })
            .then((response) => {
                dispatch(triggerStatisticSendSuccess(response.data));
            })
            .catch(() => {
                dispatch(triggerStatisticSendFailed());
            });
    };
};

export const getStatisticReports = () => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/stats-emails`)
            .then((response) => {
                dispatch(getStatisticReportsSuccess(response.data));
            })
            .catch(() => {
                dispatch(getStatisticReportsFailed());
            });
    };
};

export const getStatisticReport = (id) => {
    return (dispatch) => {
        return http
            .get(`${API_URL}/stats-emails/${id}`)
            .then((response) => {
                dispatch(getStatisticReportSuccess(response.data));
            })
            .catch(() => {
                dispatch(getStatisticReportFailed());
            });
    };
};

export const patchStatisticReport = (id, delivery, statistic) => {
    return (dispatch) => {
        return http
            .patch(`${API_URL}/stats-emails/${id}`, {
                delivery: delivery, statistics: statistic
            })
            .then((response) => {
                dispatch(updateStatisticReportSuccess(response.data));
            })
            .catch(() => {
                dispatch(updateStatisticReportFailed());
            });
    };
};

export const deleteStatisticReport = (id) => {
    return (dispatch) => {
        return http
            .delete(`${API_URL}/stats-emails/${id}`)
            .then((response) => {
                dispatch(deleteStatisticReportSuccess(response.data));
            })
            .catch(() => {
                dispatch(deleteStatisticReportFailed());
            });
    };
};

