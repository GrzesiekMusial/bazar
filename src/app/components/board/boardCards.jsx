import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageSlider from "../common/imageSlider";
import SearchBox from "../common/searchBox";
import AcceptModal from "../common/modal";

import { dataFilter } from "../../../methods/filter";
import * as base from "../../../methods/data";
import * as Forms from "../common/form/forms";

const BoardCards = (props) => {
    const [data, setData] = useState(null);
    const [category, setCategory] = useState("0");
    const [text, setText] = useState("");
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(null);

    const { user, renderImage, title, history } = props;

    useEffect(() => {
        title(
            `tablica ${category === "0" ? "" : "| " + category.toLowerCase()} ${
                text === "" ? "" : " ~ " + text.toLowerCase()
            }`
        );
    }, [category, text]);

    useEffect(async () => {
        try {
            await base.getNotices(setData);
        } catch (ex) {
            setError("Cant load data, plese try again");
        }
    }, []);

    function expand(e) {
        while (!e.target.classList.contains("board"))
            e.target = e.target.parentElement;

        const arr = e.target.children;

        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.toggle("show");
            if (i === arr.length - 1) arr[i].classList.toggle("end");
        }
    }

    const handleDelete = async (card) => {
        const result = await base.noticeDelete(card);
        if (result) {
            setData(data.filter((notice) => notice._id !== card._id));
            setModal(false);
        }
    };

    return (
        <div className="screen">
            <ToastContainer />

            {error && <Forms.Error error={error} visible={error} />}

            <div>
                <SearchBox
                    filtr={false}
                    handleSearch={setText}
                    status={{ category: category, text: text }}
                />

                {dataFilter(data, category, text).map((card) => (
                    <div className="board">
                        <div
                            className="board__title"
                            onClick={(e) => expand(e)}
                        >
                            <span>{card.title}</span>
                        </div>

                        <div className="board__content">
                            <div className="board__content--images">
                                {card.images && (
                                    <ImageSlider
                                        images={card.images}
                                        handleClick={(i, index, arr) =>
                                            renderImage(arr, index)
                                        }
                                    />
                                )}
                            </div>

                            {card.text && <p>{card.text}</p>}

                            {user && user._id === card.author._id && !modal && (
                                <div className="board__delete">
                                    <button
                                        className="actionBtn edit"
                                        onClick={() =>
                                            history.push(
                                                `/board/edit/${card._id}`
                                            )
                                        }
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

                            {modal && (
                                <AcceptModal
                                    close={setModal}
                                    accept={() => handleDelete(card)}
                                    title={`Potwierdź operację usunięcia ${card.title}`}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardCards;
