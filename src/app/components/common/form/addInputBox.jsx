import { useFormikContext } from "formik";
import ErrorMessage from "./errorMessage";

const AddInputBox = ({
    name,
    placeholder = "",
    label = null,
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
            ></input>

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default AddInputBox;
