import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import config from "../../config/config.json";

import * as base from "../../../methods/data";
import * as Forms from "../common/form/forms";

import { dataFilter } from "../../../methods/filter";

import "react-dropdown/style.css";
import SearchBox from "../common/searchBox";

import "react-lazy-load-image-component/src/effects/blur.css";
import Spinner from "./../common/spinner";
import Card from "./card";
function ProductCards(props) {
    const { title, history, match, location, user } = props;
    const [data, setData] = useState(null);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(
        history.location.state ? history.location.state.category : 0
    );
    const [text, setText] = useState(
        history.location.state ? history.location.state.text : 0
    );
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const cat =
            categories && category
                ? categories.filter((cat) => cat._id == category)[0].name
                : 0;

        const name = config.headers.sell;

        title(
            `${name} ${category == 0 ? "" : "| " + cat} ${
                text == 0 ? "" : " ~ " + text.toLowerCase()
            }`
        );
    }, [categories, category, text]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            await Promise.allSettled([
                base.getCategories(true, setCategories),
                base.getProducts(setData),
            ]);
        } catch (ex) {
            setError("Cant load data, plese try again");
        }
        setLoad(false);
    };

    return (
        <main className="screen">
            {load && <Spinner />}

            {error && <Forms.Error error={error} visible={error} />}

            <SearchBox
                status={{ category: category, text: text }}
                categories={categories}
                handleCategorySearch={setCategory}
                handleSearch={setText}
            />

            <div className="cards">
                {dataFilter(data, category, text, match.params.id).map(
                    (card) => (
                        <NavLink
                            to={{
                                pathname: "/bazar/product/" + card._id,
                                state: { category, text },
                                back: location.pathname,
                            }}
                        >
                            <Card card={card} />
                        </NavLink>
                    )
                )}
            </div>
        </main>
    );
}

export default ProductCards;
