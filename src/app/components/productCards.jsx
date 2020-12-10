import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import ReactImageAppear from "react-image-appear";

import * as base from "./common/base";

function ProductCards(props) {
    const [data, setData] = useState(base.loadProducts());

    useEffect(() => {
        props.title("ogłoszenia");
    }, []);

    return (
        <div className="screen">
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
