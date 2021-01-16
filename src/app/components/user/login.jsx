import React, { useEffect, useState } from "react";

import config from "../../config/config.json";

import * as auth from "../../../services/auth";
import * as base from "../../../methods/data";

import LoginForm from "./forms/loginForm";
import { NavLink } from "react-router-dom";

const Login = (props) => {
    const { user, title, location } = props;

    function redirect() {
        window.location = location.state
            ? location.state.from.pathname
            : "/login";
    }

    useEffect(() => {
        title(user ? config.headers.user : config.headers.login);
    }, []);

    return (
        <div className="screen">
            <div className="login">
                {user && (
                    <>
                        <div className="login__info">
                            <div>{config.info.loggedAs}</div>
                            <div>{user.login}</div>
                        </div>

                        <div>
                            <NavLink
                                to={{
                                    pathname: "/bazar/" + user._id,
                                    redirect: "/login",
                                }}
                            >
                                <button className="actionBtn">
                                    {config.user.sell}
                                </button>
                            </NavLink>

                            <NavLink
                                to={{
                                    pathname: "/board/" + user._id,
                                    redirect: "/login",
                                }}
                            >
                                <button className="actionBtn">
                                    {config.user.posts}
                                </button>
                            </NavLink>
                        </div>

                        <button
                            className="actionBtn"
                            onClick={() => auth.logout()}
                        >
                            {config.actions.logout}
                        </button>
                    </>
                )}

                {!user && <LoginForm redirect={redirect} />}
            </div>
        </div>
    );
};

export default Login;
