import { connect } from "react-redux";
import SearchView from "./search.view";

import {
    searchDevices,
    deleteFromTuya,
    deleteFromTuyaClearState,
} from "./duck/actions";
import { unlinkDeviceFromUser } from "../users/duck/actions";

const mapDispatchToProps = (dispatch) => {
    return {
        searchDevices: (tDeviceId) => {
            return dispatch(searchDevices(tDeviceId));
        },
        unlinkDeviceFromUser: (tId) => {
            return dispatch(unlinkDeviceFromUser(tId));
        },
        deleteFromTuya: (tId) => {
            return dispatch(deleteFromTuya(tId));
        },

        deleteFromTuyaClearState: () => {
            return dispatch(deleteFromTuyaClearState());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        ...state.search,
        ...state.users_devices,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
