import React, { useState } from "react";
import { useFormikContext } from "formik";

const AddSubmitButton = ({ title, ...props }) => {
    const [name, setName] = useState(title);
    const { handleSubmit } = useFormikContext();

    return (
        <button
            onClick={() => {
                handleSubmit();
                setName("TRY AGAIN");
            }}
            {...props}
        >
            {name}
        </button>
    );
};

export default AddSubmitButton;
