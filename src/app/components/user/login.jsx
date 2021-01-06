import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { pick } from "lodash";

import { validationSchema } from "./models/login";

import { RiUserAddLine } from "react-icons/ri";

import * as auth from "../../../services/auth";

import AddInputBox from "../common/form/addInputBox.jsx";
import AddSubmitButton from "../common/form/submitButton.jsx";
import Buttons from "../common/buttons.jsx";

const Login = (props) => {
    const { user, title, location } = props;

    useEffect(() => {
        title("login");
    }, []);

    const handleLogin = async (user) => {
        user = pick(user, ["email", "password"]);
        const response = await auth.login(user);

        if (response.ok) {
            localStorage.setItem("token", response.headers["x-auth-token"]);

            const { state } = location;
            window.location = state ? state.from.pathname : "/";
        }
    };

    return (
        <div className="screen">
            <div className="login">
                {user && (
                    <>
                        <div className="login__info">
                            <div>Zalogowany jako:</div>
                            <div>{user.name}</div>
                        </div>

                        <button
                            className="actionBtn"
                            onClick={() => auth.logout()}
                        >
                            WYLOGUJ
                        </button>
                    </>
                )}

                {!user && (
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={(values) => handleLogin(values)}
                        validationSchema={validationSchema}
                    >
                        {({}) => (
                            <>
                                <div className="login__buttons">
                                    <NavLink to="/register">
                                        <RiUserAddLine className="specialBtn" />
                                    </NavLink>

                                    <Buttons
                                        buttons={[
                                            {
                                                name: <RiUserAddLine />,
                                                ref: "/register",
                                            },
                                        ]}
                                    />

                                    <AddInputBox
                                        // className="addBoard__title"
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                    />

                                    <AddInputBox
                                        // className="addBoard__title"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>

                                <AddSubmitButton
                                    className="actionBtn"
                                    title="ZALOGUJ"
                                />
                            </>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default Login;
