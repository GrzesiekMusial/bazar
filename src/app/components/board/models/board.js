import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title required.")
        .min(3)
        .typeError("Min 3 char required.")
        .max(120)
        .label("Title"),
    text: Yup.string().max(6000),
});

export { validationSchema };
