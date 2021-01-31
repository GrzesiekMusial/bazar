import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Add = (props) => {
    const { title } = props;

    useEffect(() => {
        title("dodaj");
    }, [title]);

    return (
        <main className="screen screen--center">
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
        </main>
    );
};

export default Add;
