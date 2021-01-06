import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./errorMessage";

const AddTextBox = ({
    name,
    placeholder = "",
    label = null,
    defaultValue,
    ...otherProps
}) => {
    const {
        handleChange,
        errors,
        setFieldTouched,
        touched,
    } = useFormikContext();

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                id={name}
                placeholder={placeholder}
                onChange={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
                defaultValue={defaultValue}
            ></textarea>

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default AddTextBox;
