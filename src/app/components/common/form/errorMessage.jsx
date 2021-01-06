import React from "react";

const ErrorMessage = ({ error, visible = false }) => {
    if (!visible) return null;
    return <span className="error">{error}</span>;
};

export default ErrorMessage;
