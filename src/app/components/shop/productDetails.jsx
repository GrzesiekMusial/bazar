import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageSlider from "../common/imageSlider";
import AcceptModal from "../common/modal";

import * as Forms from "../common/form/forms";
import * as base from "../../../methods/data";
import { NavLink } from "react-router-dom";

function ProductDetails(props) {
    const { user, renderImage, title, history, match } = props;
    const [card, setCard] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(async () => {
        if (!(await base.getOneProduct(match.params.id, setCard, null)))
            history.push("/bazar");
    }, []);

    useEffect(() => {
        if (card) title(card.title);
    }, [card]);

    const handleDelete = async (card) => {
        await base.productDelete(card);
        setModal(false);
        history.push("/bazar");
    };

    return (
        <div className="screen">
            <NavLink
                to={{
                    pathname: "/bazar",
                    state: history.location.state,
                }}
            >
                <Forms.Back />
            </NavLink>
            <ToastContainer />
            {card && (
                <div className="screen__container">
                    <div className="productDetails__image">
                        <ImageSlider
                            images={card.images}
                            handleClick={(i, index, arr) =>
                                renderImage(arr, index)
                            }
                        />
                    </div>
                    <div className="productDetails__details">
                        <p>
                            {card.author.name
                                ? card.author.name
                                : card.author.login}
                        </p>
                        <p>{card.date}</p>
                    </div>
                    {card.price !== 0 && (
                        <div className="productDetails__image--price">
                            <span>{card.price} zł</span>
                        </div>
                    )}
                    <div className="productDetails__text">
                        <p> {card.text}</p>
                    </div>
                    <div className="">
                        {card.author.phone && (
                            <a href={`tel:${card.author.phone}`}>
                                CLICK TO CALL
                            </a>
                        )}
                    </div>

                    {modal && (
                        <AcceptModal
                            close={setModal}
                            accept={() => handleDelete(card)}
                            title={`Potwierdź operację usunięcia ${card.title}`}
                        />
                    )}
                    {user && user._id === card.author._id && !modal && (
                        <div className="productDetails__buttons">
                            <button
                                className="actionBtn edit"
                                onClick={() => history.push(`edit/${card._id}`)}
                            >
                                EDYTUJ
                            </button>
                            <button
                                className="actionBtn delete"
                                onClick={() => setModal(true)}
                            >
                                USUŃ
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
