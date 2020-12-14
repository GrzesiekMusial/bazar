import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import ReactImageAppear from "react-image-appear";

import * as base from "./common/base";

import { dataFilter } from "../../methods/filter";

import { BsFilterLeft } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

import "react-dropdown/style.css";
import SearchBox from "./common/searchBox";

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
                                <ReactImageAppear
                                    animation="zoomIn"
                                    animationDuration=".1s"
                                    className="cards__card__image"
                                    src={card.image[0]} // use normal <img> attributes as props
                                />
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
