const SpinnerWait = (cover) => {
    return (
        <div className="spinner spinner-cover">
            <div id="output" className="container"></div>

            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default SpinnerWait;
