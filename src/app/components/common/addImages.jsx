import React, { useState } from "react";
import MultiImageInput from "react-multiple-image-input";

const AddImages = (loco) => {
    const [images, setImages] = useState({});

    console.log(loco);

    const test = (img) => {
        setImages(img);
        console.log(img);
    };

    return (
        <>
            <div className="multipleImages">
                <MultiImageInput
                    allowCrop={false}
                    max={6}
                    images={images}
                    setImages={test}
                    theme={{
                        margin: "0",
                        background: "unset",
                        outlineColor: "#262a33",
                        textColor: "rgba(255,255,255,0.6)",
                        buttonColor: "#ff0e1f",
                        modalColor: "#ffffff",
                    }}
                />
            </div>
        </>
    );
};

export default AddImages;
