import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import * as base from "./common/base";
import Img from "./common/imageLoader";

import { dataFilter } from "../../methods/filter";

import "react-dropdown/style.css";
import SearchBox from "./common/searchBox";

import "react-lazy-load-image-component/src/effects/blur.css";

function ProductCards(props) {
    const [data, setData] = useState(base.loadProducts());
    const [categories, setcategories] = useState(base.loadCategories());
    const [category, setCategory] = useState("WSZYSTKIE");
    const [text, setText] = useState("");

    useEffect(() => {
        props.title(
            `ogłoszenia ${
                category === "WSZYSTKIE" ? "" : "| " + category.toLowerCase()
            } ${text === "" ? "" : " ~ " + text.toLowerCase()}`
        );
        console.log(props.match);
    }, [category, text]);

    return (
        <div className="screen">
            <SearchBox
                status={{ category: category, text: text }}
                categories={categories}
                handleCategorySearch={setCategory}
                handleSearch={setText}
            />

            <div className="cards">
                {dataFilter(data, category, text).map((card) => (
                    <NavLink to={"/bazar/product/" + card.id}>
                        <div className="cards__card">
                            {card.image && (
                                <div className="cards__card__image">
                                    <Img
                                        image={card.image[0]} // use normal <img> attributes as props
                                    />
                                </div>
                            )}
                            <div>
                                <h2 className="cards__card__title">
                                    {card.title}
                                </h2>
                                {card.price && (
                                    <div className="cards__card__price">
                                        <span>{card.price} zł</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default ProductCards;
