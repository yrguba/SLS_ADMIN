import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "../pages/login/duck/reducer";
import usersReducer from "../pages/users/duck/reducer";
import statisticReducer from "../pages/statistic/duck/reducer";
import devicesReducer from "../pages/devices/duck/reducer";
import watchesReducer from "../pages/watches/duck/reducer";
import searchReducer from "../pages/search/duck/reducer";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    users: usersReducer,
    statistic: statisticReducer,
    devices: devicesReducer,
    watches: watchesReducer,
    search: searchReducer
});

export default rootReducer;
