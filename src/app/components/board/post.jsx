import ImageSlider from "../common/imageSlider";
import SearchBox from "../common/searchBox";
import { dataFilter } from "../../../methods/filter";
import * as time from "../../../methods/time";
import { useState } from "react";
import AcceptModal from "../common/modal";
import * as base from "../../../methods/data";
import config from "../../config/config.json";
import { NavLink } from "react-router-dom";

const Post = ({ card, ...props }) => {
    const [modal, setModal] = useState(false);

    const { user, renderImage, history, location } = props;

    const handleDelete = async (card) => {
        try {
            document.getElementById(card._id).classList.toggle("remove");
            await base.noticeDelete(card);
            document.getElementById(card._id).remove();
            setModal(false);
        } catch (er) {
            document.getElementById(card._id).classList.toggle("remove");
        }
    };

    function expand(id) {
        document.getElementById(id).classList.toggle("show");
    }

    return (
        <>
            <div
                id={card._id}
                className="board"
                onClick={() => expand(card._id)}
            >
                <div className="board__header">
                    <div className="board__header--title">
                        <p>{card.title}</p>
                    </div>
                    <div className="board__header--details">
                        <p>{card.author ? card.author.login : "Undefined"}</p>
                        <p>{time.getDate(card.date)}</p>
                    </div>
                </div>

                <div className="board__content">
                    <div
                        className="board__content--images"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {card.text && <p>{card.text}</p>}
                        {card.images && (
                            <ImageSlider
                                images={card.images}
                                handleClick={(i, index, arr) =>
                                    renderImage(arr, index)
                                }
                            />
                        )}
                    </div>
                    {card.author && user && user._id === card.author._id && (
                        <div
                            className="board__delete"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <NavLink
                                className="buttonLink"
                                to={{
                                    pathname: `/board/edit/${card._id}`,
                                    state: location.state,
                                    back: location.pathname,
                                }}
                            >
                                <button className="actionBtn edit">
                                    {config.buttons.edit}
                                </button>
                            </NavLink>
                            <button
                                className="actionBtn delete"
                                onClick={() => setModal(card)}
                            >
                                {config.buttons.delete}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {modal && (
                <div onClick={(e) => e.stopPropagation()}>
                    <AcceptModal
                        close={setModal}
                        accept={() => handleDelete(modal)}
                        title={`Potwierdź operację usunięcia ${modal.title}`}
                    />
                </div>
            )}
        </>
    );
};

export default Post;
