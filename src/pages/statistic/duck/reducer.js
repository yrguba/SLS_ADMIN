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

const initialState = {
    statistic: null,
    devices_stat: null,
    loading: true,
};

export function statisticReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATISTIC_LOADING:
            return {
                ...state,
                loading: true,
            };
            case GET_STATISTIC_SUCCESS:
            return {
                ...state,
                statistic: action.payload,
                report_send_success: false,
                report_deleted: false,
                report_updated: false,
                report_error: false,
                error: null,
                loading: false,
            };
        case GET_STATISTIC_FAILED:
            return {
                ...state,
                statistic: null,
                error: true,
            };
        case GET_SPECS_SUCCESS:
            return {
                ...state,
                specs: action.payload,
                error: null,
            };
        case GET_SPECS_FAILED:
            return {
                ...state,
                specs: null,
                error: true,
            };
        case GET_DEVICES_STATS_SUCCESS:
            return {
                ...state,
                devices_stat: action.payload,
                error: false,
            };
        case GET_DEVICES_STATS_FAILED:
            return {
                ...state,
                devices_stat: null,
                error: true,
            };
        case TRIGGER_STATS_SEND_SUCCESS:
            return {
                ...state,
                report_send_success: true,
                report_error: false,
                error: false,
            };
        case TRIGGER_STATS_SEND_FAILED:
            return {
                ...state,
                report_send_success: false,
                report_error: true,
                error: true,
            };
        case GET_STATISTIC_REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.payload?.data || [],
                error: false,
            };
        case GET_STATISTIC_REPORTS_FAILED:
            return {
                ...state,
                reports: null,
                error: true,
            };
        case GET_STATISTIC_REPORT_SUCCESS:
            return {
                ...state,
                report: action.payload,
                error: false,
            };
        case GET_STATISTIC_REPORT_FAILED:
            return {
                ...state,
                report: null,
                report_error: true,
                error: true,
            };
        case UPDATE_STATISTIC_REPORT_SUCCESS:
            return {
                ...state,
                report_updated: true,
                error: false,
            };
        case UPDATE_STATISTIC_REPORT_FAILED:
            return {
                ...state,
                report_updated: false,
                report_error: true,
                error: true,
            };
        case DELETE_STATISTIC_REPORT_SUCCESS:
            return {
                ...state,
                report_deleted: true,
                error: false,
            };
        case DELETE_STATISTIC_REPORT_FAILED:
            return {
                ...state,
                report_deleted: false,
                error: true,
            };
        case CLEAR_STATISTIC_REPORT_ERROR:
            return {
                ...state,
                report_error: false,
            };
        case CLEAR_DELETE_STATISTIC_REPORT:
            return {
                ...state,
                report_deleted: false,
            };
        case CLEAR_STATS_SEND_SUCCESS:
            return {
                ...state,
                report_send_success: null,
            };
        case CLEAR_UPDATE_STATISTIC_REPORT:
            return {
                ...state,
                report_updated: false,
            };

        default:
            return state;
    }
}

export default statisticReducer;
