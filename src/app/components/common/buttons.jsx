import React from "react";
import { NavLink } from "react-router-dom";

const Buttons = ({ buttons }) => {
    return (
        <div className="screen__buttons">
            {buttons.map((button) => (
                <NavLink to={button.ref}>{button.name}</NavLink>
            ))}
        </div>
    );
};

export default Buttons;
