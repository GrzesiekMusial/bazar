import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = [
    "one",
    "two",
    "three",
    "two",
    "three",
    "two",
    "three",
    "two",
    "three",
    "two",
    "three",
];

const Dropdown = ({ options }) => {
    return (
        <Dropdown
            options={options}
            // onChange={this._onSelect}
            // value={defaultOption}
            placeholder="Select an option"
        />
    );
};

export default Dropdown;
