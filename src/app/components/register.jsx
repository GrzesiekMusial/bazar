import React, { useEffect } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import AddInputBox from "./common/form/addInputBox.jsx";
import AddSubmitButton from "./common/form/submitButton.jsx";

const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Podaj email.").label("Email").email(),
    login: Yup.string()
        .trim()
        .required("Podaj login.")
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

const Register = (props) => {
    useEffect(() => {
        props.title("register");
    }, []);

    return (
        <div className="screen">
            <Formik
                initialValues={{
                    email: "",
                    login: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(values) => console.log(values)}
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
