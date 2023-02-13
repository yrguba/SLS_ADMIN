import { connect } from "react-redux";
import DevicesView from "./devices.view";

import {
    createDevice,
    updateDevice,
    getDevices,
    createCategory,
    updateCategory,
    getDevicesCategories,
} from "./duck/actions";

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: () => {
            return dispatch(getDevices());
        },

        createDevice: (deviceData) => {
            return dispatch(createDevice(deviceData));
        },

        updateDevice: (id, deviceData) => {
            return dispatch(updateDevice(id, deviceData));
        },

        getDevicesCategories: () => {
            return dispatch(getDevicesCategories());
        },

        createCategory: (categoryData) => {
            return dispatch(createCategory(categoryData));
        },

        updateCategory: (id, categoryData) => {
            return dispatch(updateCategory(id, categoryData));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        ...state.devices,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesView);
