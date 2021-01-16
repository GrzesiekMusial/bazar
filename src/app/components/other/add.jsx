import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Add = (props) => {
    useEffect(() => {
        props.title("dodaj");
    }, []);

    return (
        <div className="screen screen--center">
            <div className="add">
                <div className="add__buttons">
                    <NavLink to={"/bazar/add"}>
                        <button className="actionBtn">sprzedaj</button>
                    </NavLink>
                    <NavLink to={"/board/add"}>
                        <button className="actionBtn">ogłoszenie</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Add;
