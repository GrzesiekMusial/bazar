import React from "react";

import { BiImageAdd } from "react-icons/bi";

import * as imagesBase from "../../../../services/images";

const ImageInput = ({ handleChange, preview, handleDelete }) => {
    const imageArr = (arr) => {
        const files = [];

        for (let key in arr) {
            if (key > 5) {
                alert("Max 6 images accepted.");
                break;
            }
            if (arr[key]["lastModified"]) {
                files.push(arr[key]);
            }
        }

        const result = preview ? preview.concat(files) : files;
        if (result.length > 6) alert("Maksymalna liczba zdjeć: 6");
        handleChange(result.slice(0, 6));
    };

    return (
        <div className="imageInput">
            <div className="imageInput__images">
                {preview &&
                    preview.map((prev, index) => (
                        <img
                            alt={`imagePreview-${index}`}
                            key={`imgPreview-${index}`}
                            id={typeof prev === "string" ? prev : prev.name}
                            src={
                                typeof prev === "string"
                                    ? imagesBase.get(prev)
                                    : URL.createObjectURL(prev)
                            }
                            onClick={(e) => handleDelete(e.target.id)}
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
                    {preview.length < 6 && <BiImageAdd />}
                </label>
            </div>

            <input
                className="imageInput--input"
                checked={false}
                id="asd"
                type="file"
                name="file"
                multiple
                onChange={(e) => imageArr(e.target.files)}
                accept="image/png, image/jpeg, image/jpg"
            />
        </div>
    );
};

export default ImageInput;
