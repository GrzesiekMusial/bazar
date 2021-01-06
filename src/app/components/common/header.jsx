import React from "react";

const Header = ({ title }) => {
    if (!title) return null;
    return (
        <header className="screen__header">
            <span>{title}</span>
        </header>
    );
};

export default Header;
