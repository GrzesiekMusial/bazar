import React, { useEffect, useState } from "react";
import { pick } from "lodash";
import { Formik } from "formik";
import config from "../../config/config.json";
import { validationSchema } from "./models/register";
import * as Yup from "yup";

import AddInputBox from "../common/form/addInputBox.jsx";
import AddSubmitButton from "../common/form/submitButton.jsx";

import * as userBase from "../../../services/users";
import Spinner from "../common/spinner";

const Register = (props) => {
    const { title } = props;
    const [load, setLoad] = useState(false);
    const [schema, setSchema] = useState(validationSchema);

    const logins = [];
    const emails = [];

    userBase.get().then((res) => checkUsers(res.data));

    const checkUsers = (res) => {
        try {
            res.forEach((user) => {
                logins.push(user.login);
                emails.push(user.email);
            });

            const newSchema = Yup.object().shape({
                email: Yup.string()
                    .trim()
                    .notOneOf(emails, "Email is already registered.")
                    .required("Podaj email.")
                    .label("Email")
                    .email(),
                login: Yup.string()
                    .trim()
                    .notOneOf(logins, "That name is already taken.")
                    .required("Podaj nazwe.")
                    .min(5)
                    .max(120)
                    .label("Login"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required"),
            });

            setSchema(newSchema);
        } catch (ex) {}
    };

    useEffect(() => {
        title(config.headers.register);
    }, []);

    const checkUser = () => {};
    const checEmail = () => {};

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
        <main className="screen">
            {load && <Spinner />}

            <Formik
                initialValues={{
                    email: "",
                    login: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(values) => handleRegister(values)}
                validationSchema={schema}
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
        </main>
    );
};

export default Register;
