import React from "react";
import Swiper from "react-id-swiper";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";

import ImageLoader from "./imageLoader";
import noPic from "../../../assets/media/no-image.png";

SwiperCore.use([Navigation, Pagination]);

const ImageSlider = ({ images, handleClick = false }) => {
    const imagesList = [];

    if (images)
        for (let key in images) {
            imagesList.push(images[key]);
        }
    else imagesList.push(noPic);

    const params = {
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        spaceBetween: 30,
    };

    return (
        <Swiper {...params}>
            {imagesList.map((img, index, arr) => (
                <div key={`slide-${index}`} className="imageSlider">
                    <ImageLoader
                        onClick={() => handleClick(img, index, arr)}
                        image={img}
                    />
                </div>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
