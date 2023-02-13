import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import rootReducer from "./root-reducer";

export const history = createBrowserHistory();
const store = createStore(rootReducer(history), applyMiddleware(thunk));

export default store;
