import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import ReactImageAppear from "react-image-appear";

import * as base from "./common/base";

import { BsFilterLeft } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

import "react-dropdown/style.css";

function ProductCards(props) {
    const [data, setData] = useState(base.loadProducts());
    const [categories, setcategories] = useState(base.loadCategories());

    useEffect(() => {
        props.title("ogłoszenia");
    }, []);

    const handleSearch = (search) => {
        search === ""
            ? props.title(`ogłoszenia`)
            : props.title(`ogłoszenia | ~ ${search.toLowerCase()}`);

        setData([]);

        const loadData = base.loadProducts();

        for (let i = 0; i < loadData.length; i++) {
            if (
                loadData[i].title.toUpperCase().includes(search.toUpperCase())
            ) {
                setData((arr) => [...arr, loadData[i]]);
            } else if (
                loadData[i].text.toUpperCase().includes(search.toUpperCase())
            ) {
                setData((arr) => [...arr, loadData[i]]);
            }
        }
    };

    const handleCategorySearch = (search) => {
        search === "WSZYSTKIE"
            ? props.title(`ogłoszenia`)
            : props.title(`ogłoszenia | ${search.toLowerCase()}`);

        setData([]);

        const loadData = base.loadProducts();

        for (let i = 0; i < loadData.length; i++) {
            if (loadData[i].category.toUpperCase() === search.toUpperCase()) {
                setData((arr) => [...arr, loadData[i]]);
            }
        }
    };

    const searchOpen = () => {
        console.log("focused");
        document.getElementById("searchBox").focus();
    };

    const CategoryOpen = () => {
        console.log("focused");
        document.getElementById("categoryBox").focus();
    };

    return (
        <div className="screen">
            <BsFilterLeft
                className="icon icon--category"
                onClick={CategoryOpen}
            />
            <BiSearchAlt className="icon icon--search" onClick={searchOpen} />

            <select
                className="searchBox"
                id="categoryBox"
                onChange={(e) => handleCategorySearch(e.currentTarget.value)}
                defaultValue={"WSZYSTKIE"}
            >
                {["WSZYSTKIE", ...categories].map((cat) => (
                    <option value={cat}>{cat}</option>
                ))}
            </select>

            <input
                id="searchBox"
                className="searchBox"
                onChange={(e) => handleSearch(e.currentTarget.value)}
            ></input>

            <div className="cards">
                {data.map((card) => (
                    <NavLink to={"/bazar/product/" + card.id}>
                        <div className="cards__card">
                            {card.image && (
                                <ReactImageAppear
                                    animation="fadeIn"
                                    animationDuration=".2s"
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
