import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Add = (props) => {
    useEffect(() => {
        props.title("dodaj");
    }, []);

    return (
        <div className="screen">
            <div className="screen__container">
                <div className="add">
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
