import { useEffect, useState } from "react";

import AddImages from "./common/addImages";

import * as base from "./common/base";

const BoardCards = (props) => {
    useEffect(() => {
        console.log(props.data);
        props.title("tablica");
    }, []);

    const [cards, setCards] = useState(base.loadBoard());

    function expand(e) {
        while (!e.target.classList.contains("board"))
            e.target = e.target.parentElement;

        const arr = e.target.children;

        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.toggle("show");
            if (i === arr.length - 1) arr[i].classList.toggle("end");
        }
    }

    const handleDelete = (id) => {
        const newData = base.deleteBoard(id);
        setCards(newData);
    };

    return (
        <div className="screen">
            <div className="screen__container">
                {cards.map((card) => (
                    <div className="board">
                        <div
                            className="board__title"
                            onClick={(e) => expand(e)}
                        >
                            <span>{card.title}</span>
                        </div>

                        <div className="board__content">
                            {card.image && (
                                <AddImages
                                    adder={false}
                                    image={card.image}
                                    handleClick={(i, index, arr, e) =>
                                        props.renderImage(arr, index, e)
                                    }
                                />
                            )}

                            {card.text && <p>{card.text}</p>}
                            <div className="board__delete">
                                <button
                                    className="actionBtn"
                                    onClick={() => handleDelete(card.id)}
                                >
                                    USUŃ
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardCards;
