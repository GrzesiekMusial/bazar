import Swiper from "react-id-swiper";

import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import "swiper/swiper-bundle.css";
import Img from "./imageLoader";

SwiperCore.use([Navigation, Pagination]);

const ImageSlider = ({ images, handleClick = false }) => {
    const imagesList = [];
    for (let key in images) {
        imagesList.push(images[key]);
    }

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
                <div className="cards__card__image">
                    <Img
                        onClick={() => handleClick(img, index, arr)}
                        image={img}
                    />
                </div>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
