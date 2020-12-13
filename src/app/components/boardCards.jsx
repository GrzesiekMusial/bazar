import { useEffect, useState } from "react";

import * as base from "./common/base";
import ImageSlider from "./common/imageSlider";
import SearchBox from "./common/searchBox";

const BoardCards = (props) => {
    useEffect(() => {
        props.title("tablica");
    }, []);

    const [data, setData] = useState(base.loadBoards());

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
        setData(newData);
    };

    const handleSearch = (search) => {
        search === ""
            ? props.title(`tablica`)
            : props.title(`tablica | ~ ${search.toLowerCase()}`);

        setData([]);

        const loadData = base.loadBoards();

        if (search === "") return setData(loadData);

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

    return (
        <div className="screen">
            <div className="screen__container">
                <SearchBox filtr={false} handleSearch={handleSearch} />

                {data.map((card) => (
                    <div className="board">
                        <div
                            className="board__title"
                            onClick={(e) => expand(e)}
                        >
                            <span>{card.title}</span>
                        </div>

                        <div className="board__content">
                            <div>
                                {card.image && (
                                    <ImageSlider
                                        images={card.image}
                                        handleClick={(i, index, arr) =>
                                            props.renderImage(arr, index)
                                        }
                                    />
                                )}
                            </div>

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
