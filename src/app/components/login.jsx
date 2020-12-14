import React, { useEffect } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import AddInputBox from "./common/form/addInputBox.jsx";
import AddSubmitButton from "./common/form/submitButton.jsx";

const validationSchema = Yup.object().shape({
    login: Yup.string()
        .trim()
        .required("Podaj login.")
        .min(5)
        .max(120)
        .label("Login"),
    password: Yup.string().min(5).max(6000),
});

const Login = (props) => {
    useEffect(() => {
        props.title("login");
    }, []);

    return (
        <div className="screen">
            <Formik
                initialValues={{
                    login: "",
                    password: "",
                }}
                onSubmit={(values) => console.log(values)}
                validationSchema={validationSchema}
            >
                {({}) => (
                    <>
                        <div className="login">
                            <div className="login__buttons">
                                <AddInputBox
                                    // className="addBoard__title"
                                    name="login"
                                    label="Login"
                                    placeholder="Login"
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
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default Login;
