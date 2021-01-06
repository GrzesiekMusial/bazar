import React from "react";

import { BiImageAdd } from "react-icons/bi";

import * as imagesBase from "../../../../services/images";

const ImageInput = ({ handleChange, preview }) => {
    const imageArr = (arr) => {
        const result = [];

        for (let key in arr) {
            if (key > 5) {
                alert("Max 6 images accepted.");
                break;
            }
            if (arr[key]["lastModified"]) {
                result.push(arr[key]);
            }
        }

        handleChange(result);
    };

    return (
        <div className="imageInput">
            <div className="imageInput__images">
                {preview &&
                    preview.map((prev) => (
                        <img
                            src={
                                typeof prev === "string"
                                    ? imagesBase.get(prev)
                                    : URL.createObjectURL(prev)
                            }
                        ></img>
                    ))}
            </div>

            <div className="imageInput__label">
                <label
                    htmlFor="asd"
                    onClick={() =>
                        document
                            .getElementById("asd")
                            .setAttribute("checked", true)
                    }
                >
                    <BiImageAdd />
                </label>
            </div>

            <input
                className="imageInput--input"
                checked={false}
                id="asd"
                type="file"
                name="images"
                multiple
                onChange={(e) => imageArr(e.target.files)}
                accept="image/png, image/jpeg, image/jpg"
            />
        </div>
    );
};

export default ImageInput;
