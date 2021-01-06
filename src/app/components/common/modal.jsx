const AcceptModal = ({ title, accept, close }) => {
    return (
        <div className="acceptModal">
            <div className="acceptModal--title">{title}</div>
            <div>
                <button className="actionBtn delete" onClick={accept}>
                    AKCEPTUJ
                </button>
                <button className="actionBtn edit" onClick={() => close(false)}>
                    ANULUJ
                </button>
            </div>
        </div>
    );
};

export default AcceptModal;
