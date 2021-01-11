import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import noPic from "../../../assets/media/no-image.png";

import * as imagesBase from "../../../services/images";

const Img = ({ image, onClick = null }) => {
    console.log("LAZY LOAD : ", image);
    return (
        <LazyLoadImage
            onClick={onClick}
            height="Inherit"
            src={image ? imagesBase.get(image) : noPic} // use normal <img> attributes as props
            width="100%"
            effect="blur"
            placeholderSrc={noPic}
        />
    );
};

export default Img;
