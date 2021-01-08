import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Nazwa jest wymagana.")
        .min(3)
        .typeError("Nieprawidłowa wartość.")
        .max(120)
        .label("Nazwa"),
    text: Yup.string().max(6000),
    images: Yup.array(),
    price: Yup.number()
        .typeError("Nieprawidłowa wartość.")
        .max(9000000)
        .test("is-decimal", "invalid decimal", (value) =>
            (value + "").match(/d*/)
        ),
    category: Yup.string().required().max(255),
});

export { validationSchema };
