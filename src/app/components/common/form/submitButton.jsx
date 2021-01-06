import React from "react";
import { useFormikContext } from "formik";

const AddSubmitButton = ({ title, ...props }) => {
    const { handleSubmit } = useFormikContext();

    return (
        <button onClick={handleSubmit} {...props}>
            {title}
        </button>
    );
};

export default AddSubmitButton;
