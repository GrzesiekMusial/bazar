import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as auth from "../../../services/auth";

const ProtectedRoute = ({
    component: Component,
    render,
    title,
    protect = true,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (protect && !auth.getUser())
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                return Component ? (
                    <Component {...props} title={title} />
                ) : (
                    render(props)
                );
            }}
        />
    );
};

export default ProtectedRoute;
