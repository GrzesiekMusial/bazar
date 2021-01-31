import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import config from "../../config/config.json";

import { logout } from "../../../services/auth";

import LoginForm from "./forms/loginForm";

const Login = (props) => {
    const { user, title, location } = props;

    function redirect() {
        window.location = location.state
            ? location.state.from.pathname
            : "/login";
    }

    useEffect(() => {
        title(user ? config.headers.user : config.headers.login);
    }, [title, user]);

    return (
        <main className="screen">
            <div className="login">
                {user && (
                    <>
                        <div className="login__info">
                            <div>{config.info.loggedAs}</div>
                            <div>{user.login}</div>
                        </div>

                        <div className="login__buttons">
                            <button
                                className="actionBtn"
                                onClick={() => logout()}
                            >
                                {config.actions.logout}
                            </button>
                        </div>

                        <div className="login__buttons">
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
                    </>
                )}

                {!user && <LoginForm redirect={redirect} />}
            </div>
        </main>
    );
};

export default Login;
