import { useState } from "react";

const AcceptModal = ({ title, accept, close }) => {
    const [name, setName] = useState("AKCEPTUJ");

    return (
        <div className="acceptModal">
            <div className="acceptModal--title">{title}</div>
            <div>
                <button
                    className="actionBtn delete"
                    onClick={() => {
                        accept();
                        setName("TRY AGAIN");
                    }}
                >
                    {name}
                </button>
                <button className="actionBtn edit" onClick={() => close(false)}>
                    ANULUJ
                </button>
            </div>
        </div>
    );
};

export default AcceptModal;
