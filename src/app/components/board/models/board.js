import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(3).max(120),
    text: Yup.string().max(6000),
});

export { validationSchema };
