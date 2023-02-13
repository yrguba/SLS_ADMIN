import { connect } from "react-redux";
import WatchesView from "./watches.view";

import {
    getWatches,
    getUsers,
    resetPassword,
    sendMailToUser,
    bindWatch,
    unbindWatch,
    removeWatch,
    getWatchesOnline,
    clearState,
    createWatch,
    createChild,
    deleteChild,
    deleteUser
} from "./duck/actions";

const mapDispatchToProps = (dispatch) => {
    return {
        getWatches: (page, limit, like) => {
            return dispatch(getWatches(page, limit, like));
        },

        getUsers: (page, limit, like) => {
            return dispatch(getUsers(page, limit, like));
        },

        resetPassword: (email) => {
            return dispatch(resetPassword(email));
        },

        sendMailToUser: (email, subject, message) => {
            return dispatch(sendMailToUser(email, subject, message));
        },

        bindWatch: (reg_code, child_id, timezone) => {
            return dispatch(bindWatch(reg_code, child_id, timezone));
        },

        unbindWatch: (reg_code, child_id) => {
            return dispatch(unbindWatch(reg_code, child_id));
        },

        removeWatch: (reg_code) => {
            return dispatch(removeWatch(reg_code));
        },

        getWatchesOnline: () => {
            return dispatch(getWatchesOnline());
        },

        createWatch: (data) => {
            return dispatch(createWatch(data));
        },

        createChild: (parentId, data) => {
            return dispatch(createChild(parentId, data));
        },

        deleteChild: (id, regCode) => {
            return dispatch(deleteChild(id, regCode));
        },

        deleteUser: (id) => {
            return dispatch(deleteUser(id));
        },

        clearState: () => {
            return dispatch(clearState());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        ...state.watches,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchesView);
