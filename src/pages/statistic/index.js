import { connect } from "react-redux";
import StatisticView from "./statistic.view";

import {
    getStatistic,
    getSpecs,
    getDevicesStat,
    triggerStatisticSend,
    getStatisticReports,
    getStatisticReport,
    patchStatisticReport,
    deleteStatisticReport,
    clearReportDeletedState,
    clearReportUpdatedState,
    clearReportErrorState,
    clearReportSendState,
} from "./duck/actions";

import { getDevices } from "../devices/duck/actions";

const mapDispatchToProps = (dispatch) => {
    return {
        getStatistic: (until, since) => {
            return dispatch(getStatistic(until, since));
        },
        getDevices: () => {
            return dispatch(getDevices());
        },
        getSpecs: (homeId, deviceId) => {
            return dispatch(getSpecs(homeId, deviceId));
        },
        getDevicesStat: (categoryId, productId, since, until) => {
            return dispatch(getDevicesStat(categoryId, productId, since, until));
        },
        sendReport: (delivery, statistic) => {
            return dispatch(triggerStatisticSend(delivery, statistic))
        },
        patchReport: (delivery, statistic) => {
            return dispatch(patchStatisticReport(delivery, statistic))
        },
        getReports: () => {
            return dispatch(getStatisticReports());
        },
        getReport: (id) => {
            return dispatch(getStatisticReport(id));
        },
        deleteReport: (id) => {
            return dispatch(deleteStatisticReport(id));
        },
        clearReportDeletedState: () => {
            return dispatch(clearReportDeletedState());
        },
        clearReportUpdatedState: () => {
            return dispatch(clearReportUpdatedState());
        },

        clearReportErrorState: () => {
            return dispatch(clearReportErrorState());
        },

        clearReportSendState: () => {
            return dispatch(clearReportSendState());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        ...state.statistic,
        ...state.devices,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticView);
