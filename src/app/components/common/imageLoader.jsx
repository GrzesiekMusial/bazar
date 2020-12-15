import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ image, onClick = null }) => {
    return (
        <LazyLoadImage
            onClick={onClick}
            height="Inherit"
            src={image} // use normal <img> attributes as props
            width="100%"
            effect="blur"
            placeholderSrc="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
    );
};

export default Img;
