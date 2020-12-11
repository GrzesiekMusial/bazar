import { useFormikContext } from "formik";
import ErrorMessage from "./errorMessage";

const AddSelectBox = ({ name, arr, label = null, ...otherProps }) => {
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
                defaultValue={arr[0]}
            >
                {arr.map((cat) => (
                    <option value={cat}>{cat}</option>
                ))}
            </select>

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default AddSelectBox;
