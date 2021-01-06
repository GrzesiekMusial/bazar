import React from "react";
import { NavLink } from "react-router-dom";

const Buttons = ({ buttons }) => {
    return (
        <div className="screen__buttons">
            {buttons.map((button) => (
                <NavLink to={button.ref}>
                    <button>{button.name}</button>
                </NavLink>
            ))}
        </div>
    );
};

export default Buttons;
