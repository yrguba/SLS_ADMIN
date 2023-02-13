import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { _isLoggedIn } from "./service";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = _isLoggedIn();

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute;
