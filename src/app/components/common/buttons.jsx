import React from "react";
import { NavLink } from "react-router-dom";

const Buttons = ({ buttons }) => {
    return (
        <div className="screen__buttons">
            {buttons.map((button, index) => (
                <NavLink key={`nav-${index}`} to={button.ref}>
                    <span
                        style={{
                            visibility: "visible",
                            position: "fixed",
                            bottom: "-500px",
                        }}
                    >
                        {button.info}
                    </span>
                    {button.name}
                </NavLink>
            ))}
        </div>
    );
};

export default Buttons;
