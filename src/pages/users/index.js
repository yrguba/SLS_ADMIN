import { connect } from "react-redux";
import UsersView from "./users.view";

import {
    getUsers,
    getDevicesByUser,
    unlinkDeviceFromUser,
    changePermissions,
    getPermissions, getUserPermissions,
} from "./duck/actions";

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (queryData) => {
            return dispatch(getUsers(
                queryData.page,
                queryData.size,
                queryData.queryEmailString
            ));
        },

        getDevicesByUser: (userId) => {
            return dispatch(getDevicesByUser(userId));
        },

        unlinkDeviceFromUser: (tId) => {
            return dispatch(unlinkDeviceFromUser(tId));
        },

        changePermissions: (userId, permissions) => {
            return dispatch(changePermissions(userId, permissions))
        },

        getPermissions: () => {
            return dispatch(getPermissions())
        },

        getUserPermissions: (userId) => {
            return dispatch(getUserPermissions(userId))
        }
    };
};

const mapStateToProps = (state) => {
    return {
        ...state.users,
        ...state.users_devices,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersView);
