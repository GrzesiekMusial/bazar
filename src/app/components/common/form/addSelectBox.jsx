import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./errorMessage";

const AddSelectBox = ({
    name,
    arr,
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
            <select
                id={name}
                onChange={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
                defaultValue={defaultValue}
            >
                {arr.map((cat) => (
                    <option
                        selected={defaultValue === cat._id ? true : false}
                        value={cat._id}
                    >
                        {cat.name}
                    </option>
                ))}
            </select>

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default AddSelectBox;
