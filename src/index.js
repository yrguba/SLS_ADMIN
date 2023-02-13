import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './private';
import './index.less';

import store from './store';
import LoginView from './pages/login';
import UsersView from './pages/users';
import StatisticView from './pages/statistic';

import moment from 'moment';
import 'moment/locale/ru';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import DevicesView from "./pages/devices";
import WatchesView from "./pages/watches";
import SearchView from "./pages/search";
import { _getClient } from "./service";

moment().locale('ru');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={ruRU}>
                <Switch>
                    <Route path="/login" component={LoginView} />
                    <PrivateRoute path="/devices" component={DevicesView} />
                    <PrivateRoute path="/statistic" component={StatisticView}/>
                    <PrivateRoute path="/watches" component={WatchesView} />
                    <PrivateRoute path="/search" component={SearchView} />
                    <PrivateRoute path="/" component={_getClient() === 'apps@defacto-group.ru' ? WatchesView : UsersView} />
                </Switch>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
