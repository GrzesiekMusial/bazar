import React, { useEffect, useState } from "react";

import ImageSlider from "../common/imageSlider";
import AcceptModal from "../common/modal";

import * as Forms from "../common/form/forms";
import * as time from "../../../methods/time";
import * as base from "../../../methods/data";
import { NavLink } from "react-router-dom";
import Spinner from "./../common/spinner";
import { useHistory } from "react-router-dom";
import config from "../../config/config.json";

function ProductDetails(props) {
    const { user, renderImage, title, match, history } = props;
    const [card, setCard] = useState(null);
    const [modal, setModal] = useState(false);
    const [load, setLoad] = useState(true);
    const back = useHistory();

    useEffect(async () => {
        if (!(await base.getOneProduct(match.params.id, setCard, null)))
            back.push(props.location.back, props.location.state);
        setLoad(false);
    }, []);

    useEffect(() => {
        if (card) title(card.title);
    }, [card]);

    const handleDelete = async (card) => {
        try {
            await base.productDelete(card);
            back.push(props.location.back, props.location.state);
        } catch (ex) {
            setModal(false);
        }
    };

    return (
        <main className="screen">
            {load && <Spinner />}

            {history.location.back && (
                <NavLink
                    to={{
                        pathname: history.location.back,
                        state: history.location.state,
                    }}
                >
                    <Forms.Back />
                </NavLink>
            )}
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
                        {card.author && (
                            <p>
                                {card.author.login
                                    ? card.author.login
                                    : "Undefined"}
                            </p>
                        )}
                        <p>{time.getDate(card.date)}</p>
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
                        {card.author && card.author.phone && (
                            <a href={`tel:${card.author.phone}`}>
                                CLICK TO CALL
                            </a>
                        )}
                    </div>

                    {modal && (
                        <AcceptModal
                            close={setModal}
                            accept={() => {
                                handleDelete(card);
                                setLoad(true);
                            }}
                            title={`${config.info.deleteAcceptConfirmation} ${card.title}`}
                        />
                    )}
                    {card.author &&
                        user &&
                        user._id === card.author._id &&
                        !modal && (
                            <div className="productDetails__buttons">
                                <NavLink
                                    className="buttonLink"
                                    to={{
                                        pathname: `edit/${card._id}`,
                                        state: history.location.state,
                                        back: history.location.back,
                                    }}
                                >
                                    <button className="actionBtn edit">
                                        {config.buttons.edit}
                                    </button>
                                </NavLink>
                                <button
                                    className="actionBtn delete"
                                    onClick={() => setModal(true)}
                                >
                                    {config.buttons.remove}
                                </button>
                            </div>
                        )}
                </div>
            )}
        </main>
    );
}

export default ProductDetails;
