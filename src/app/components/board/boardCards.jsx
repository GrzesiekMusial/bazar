import React, { useEffect, useState } from "react";

import config from "../../config/config.json";

import SearchBox from "../common/searchBox";

import { dataFilter } from "../../../methods/filter";
import * as base from "../../../methods/data";
import * as Forms from "../common/form/forms";
import Spinner from "../common/spinner";
import Post from "./post";

const BoardCards = (props, toast) => {
    const [data, setData] = useState(null);
    const [category] = useState(0);
    const [text, setText] = useState(0);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);

    const { title, match } = props;

    useEffect(() => {
        title(
            `${config.headers.board} ${
                category === 0 ? "" : "| " + category.toLowerCase()
            } ${text === 0 ? "" : " ~ " + text.toLowerCase()}`
        );
    }, [category, text, title]);

    useEffect(() => {
        async function fetchData() {
            try {
                await base.getNotices(setData);
            } catch (ex) {
                setError("Cant load data, plese try again");
            }
            setLoad(false);
        }
        fetchData();
    }, []);

    return (
        <main className="screen">
            {load && <Spinner />}

            {error && <Forms.Error error={error} visible={error} />}
            <SearchBox
                filtr={false}
                handleSearch={setText}
                status={{ category: category, text: text }}
            />

            <div>
                {dataFilter(data, category, text, match.params.id).map(
                    (card, index) => (
                        <Post key={`card-${index}`} card={card} {...props} />
                    )
                )}
            </div>
        </main>
    );
};

export default BoardCards;
