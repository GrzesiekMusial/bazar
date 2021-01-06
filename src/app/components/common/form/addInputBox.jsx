import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./errorMessage";

const AddInputBox = ({
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

            <input
                id={name}
                placeholder={placeholder}
                onChange={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
                defaultValue={defaultValue}
            ></input>
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default AddInputBox;
