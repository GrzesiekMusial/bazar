const Spinner = () => {
    return (
        <div className="spinner">
            <div id="output" className="container"></div>
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;
