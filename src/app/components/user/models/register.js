import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Podaj email.").label("Email").email(),
    login: Yup.string()
        .trim()
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

export { validationSchema };
