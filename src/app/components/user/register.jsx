import React, { useEffect, useState } from "react";
import { pick } from "lodash";
import { Formik } from "formik";
import config from "../../config/config.json";

import { validationSchema } from "./models/register";

import AddInputBox from "../common/form/addInputBox.jsx";
import AddSubmitButton from "../common/form/submitButton.jsx";

import * as userBase from "../../../services/users";
import Spinner from "../common/spinner";

const Register = (props) => {
    const { title } = props;
    const [load, setLoad] = useState(false);

    useEffect(() => {
        title(config.headers.register);
    }, []);

    const handleRegister = async (user) => {
        setLoad(true);

        user.email = user.email.trim().toLowerCase();
        user.login = user.login.trim();

        user = pick(user, ["login", "email", "password"]);
        const response = await userBase.add(user);

        if (response.ok) {
            localStorage.setItem("token", response.headers["x-auth-token"]);
            window.location = "/login";
        } else setLoad(false);
    };

    return (
        <div className="screen">
            {load && <Spinner />}

            <Formik
                initialValues={{
                    email: "",
                    login: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(values) => handleRegister(values)}
                validationSchema={validationSchema}
            >
                {({}) => (
                    <>
                        <div className="login">
                            <div className="login__buttons">
                                <AddInputBox
                                    name="email"
                                    label={config.info.email}
                                    placeholder="Email..."
                                />

                                <AddInputBox
                                    label={config.info.login}
                                    name="login"
                                    placeholder="Login..."
                                />
                                <AddInputBox
                                    label={config.info.password}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <AddInputBox
                                    label={config.info.password}
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password..."
                                />
                            </div>

                            <AddSubmitButton
                                className="actionBtn"
                                title={config.actions.register}
                            />
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default Register;
