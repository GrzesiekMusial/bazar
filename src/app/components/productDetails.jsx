import React, { useEffect } from "react";

import * as base from "./common/base";
import ImageSlider from "./common/imageSlider";

function ProductDetails(props) {
    useEffect(() => {
        props.title(card.title);
    }, []);

    const card = base
        .loadProducts()
        .filter((card) => card.id == props.match.params.id)[0];

    const handleDelete = () => {
        base.deleteProduct(card.id, props, "/bazar");
    };

    return (
        <div className="screen">
            <div className="screen__container">
                <div className="productDetails__image">
                    {card.image && (
                        <ImageSlider
                            images={card.image}
                            handleClick={(i, index, arr) =>
                                props.renderImage(arr, index)
                            }
                        />
                    )}
                </div>

                <div className="productDetails__details">
                    <p>monica</p>
                    <p>Wczoraj 19:20</p>
                </div>
                {card.price && (
                    <div className="productDetails__image--price">
                        <span>{card.price} zł</span>
                    </div>
                )}
                <div className="productDetails__text">
                    <span> {card.text}</span>
                </div>

                <div className="productDetails__buttons">
                    <button className="actionBtn" onClick={handleDelete}>
                        USUŃ
                    </button>{" "}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
