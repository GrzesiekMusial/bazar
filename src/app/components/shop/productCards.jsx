import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Img from "../common/imageLoader";

import * as base from "../../../methods/data";
import * as Forms from "../common/form/forms";

import { dataFilter } from "../../../methods/filter";

import "react-dropdown/style.css";
import SearchBox from "../common/searchBox";

import "react-lazy-load-image-component/src/effects/blur.css";
function ProductCards(props) {
    const { title, history } = props;
    const [data, setData] = useState(null);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(
        history.location.state ? history.location.state.category : "0"
    );
    const [text, setText] = useState(
        history.location.state ? history.location.state.text : ""
    );
    const [error, setError] = useState(null);

    useEffect(() => {
        const name =
            categories && category
                ? categories.filter((cat) => cat._id == category)[0].name
                : null;

        title(
            `ogłoszenia ${category === "0" ? "" : "| " + name} ${
                text === "" ? "" : " ~ " + text.toLowerCase()
            }`
        );
    }, [categories, category, text]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            await base.getProducts(setData);
            await base.getCategories(true, setCategories);
        } catch (ex) {
            setError("Cant load data, plese try again");
        }
    };

    return (
        <div className="screen">
            {error && <Forms.Error error={error} visible={error} />}

            {categories && (
                <SearchBox
                    status={{ category: category, text: text }}
                    categories={categories}
                    handleCategorySearch={setCategory}
                    handleSearch={setText}
                />
            )}

            <div className="cards">
                {dataFilter(data, category, text).map((card) => (
                    <NavLink
                        to={{
                            pathname: "/bazar/product/" + card._id,
                            state: { category, text },
                        }}
                    >
                        <div className="cards__card">
                            <div className="cards__card__image">
                                <Img
                                    image={
                                        card.images
                                            ? card.images[0]
                                            : card.images
                                    }
                                />
                            </div>
                            <div>
                                <h2 className="cards__card__title">
                                    {card.title}
                                </h2>
                                {card.price !== 0 && (
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
