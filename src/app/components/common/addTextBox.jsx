const AddTextBox = ({ changeTitle, changeText }) => {
    return (
        <>
            <input
                onChange={(e) => changeTitle(e.currentTarget.value)}
                className="addBoard__title"
                placeholder="temat"
            ></input>
            <textarea
                onChange={(e) => changeText(e.currentTarget.value)}
                placeholder="opis..."
                className="addBoard__text"
            ></textarea>
        </>
    );
};

export default AddTextBox;
