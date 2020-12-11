import { BiImageAdd as ImageAdd } from "react-icons/bi";

const AddImages = ({
    image,
    addImage = false,
    handleClick = false,
    adder = true,
}) => {
    return (
        <>
            {adder && image && image.length < 5 && (
                <>
                    <label htmlFor="picture" className="addBoard__addPicture">
                        <ImageAdd />
                    </label>

                    <input
                        className="addBoard__input"
                        src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png"
                        type="file"
                        accept="image/x-png,image/jpeg,image"
                        id="picture"
                        label="picture"
                        onChange={(event) => addImage(event)}
                    />
                </>
            )}
            {image &&
                image.length > 0 &&
                image
                    .slice(0)
                    .reverse()
                    .map((i, index, arr) => (
                        <img
                            animation="fadeIn"
                            animationDuration=".2s"
                            id={i}
                            src={i}
                            alt={i}
                            className="addBoard__picture"
                            onClick={() => handleClick(i, index, arr)}
                        />
                    ))}
        </>
    );
};

export default AddImages;
