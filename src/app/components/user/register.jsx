import React, { useEffect } from "react";
import { pick } from "lodash";
import { Formik } from "formik";

import { validationSchema } from "./models/register";

import AddInputBox from "../common/form/addInputBox.jsx";
import AddSubmitButton from "../common/form/submitButton.jsx";

import * as userBase from "../../../services/users";

const Register = (props) => {
    const { title } = props;

    useEffect(() => {
        title("register");
    }, []);

    const handleRegister = async (user) => {
        user = pick(user, ["login", "email", "password"]);
        const response = await userBase.add(user);

        if (response.ok) {
            localStorage.setItem("token", response.headers["x-auth-token"]);
            window.location = "/";
        }
    };

    return (
        <div className="screen">
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
                                    label="Email"
                                    placeholder="Email..."
                                />

                                <AddInputBox
                                    label="Login"
                                    name="login"
                                    placeholder="Login..."
                                />
                                <AddInputBox
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <AddInputBox
                                    label="Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password..."
                                />
                            </div>

                            <AddSubmitButton
                                className="actionBtn"
                                title="REGISTER"
                            />
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default Register;
