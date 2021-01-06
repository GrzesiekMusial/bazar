import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Podaj email.").label("Email").email(),
    password: Yup.string().min(5).max(6000),
});

export { validationSchema };
