import React from "react";
import { NavLink } from "react-router-dom";
import Ripples from "react-ripples";

const Buttons = ({ buttons }) => {
    return (
        <div className="screen__buttons">
            {buttons.map((button, index) => (
                <Ripples>
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
                </Ripples>
            ))}
        </div>
    );
};

export default Buttons;
