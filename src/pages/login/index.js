import { connect } from "react-redux";
import LoginView from "./login.view";

import {
    getTokens,
} from "./duck/actions";

import { _setTokens, _isLoggedIn } from "../../service";

const mapDispatchToProps = (dispatch) => {
    return {
        getTokens: (data) => {
            return dispatch(getTokens(data));
        },
    };
};

const mapStateToProps = (state) => {
    if (state.login && state.login.access_token) {
        _setTokens({
            access_token: state.login.access_token,
            refresh_token: state.login.refresh_token,
            expires_in: state.login.expires_in,
        });
    }
    return {
        ...state.login,
        isLogged: _isLoggedIn()
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
