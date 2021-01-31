import React, { useState } from "react";
import { pick } from "lodash";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";

import { RiUserAddLine } from "react-icons/ri";

import { validationSchema } from "../models/login";
import Spinner from "../../common/spinner";
import config from "../../../config/config.json";
import * as auth from "../../../../services/auth";

import AddInputBox from "../../common/form/addInputBox.jsx";
import AddSubmitButton from "../../common/form/submitButton.jsx";
import Buttons from "../../common/buttons.jsx";

const LoginForm = ({ redirect }) => {
    const [load, setLoad] = useState(false);

    const handleLogin = async (user) => {
        setLoad(true);
        user.email = user.email.trim().toLowerCase();
        user = pick(user, ["email", "password"]);
        const response = await auth.login(user);

        if (response.ok) {
            localStorage.setItem("token", response.headers["x-auth-token"]);
            console.log("ok");
            redirect();
        } else {
            setLoad(false);
            toast.error("Please check login & password.");
        }
    };

    return (
        <>
            {load && <Spinner />}

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={validationSchema}
            >
                {() => (
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
                                label={config.info.email}
                                placeholder="Email"
                            />

                            <AddInputBox
                                // className="addBoard__title"
                                label={config.info.password}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        <AddSubmitButton
                            className="actionBtn"
                            title={config.actions.login}
                        />
                    </>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
