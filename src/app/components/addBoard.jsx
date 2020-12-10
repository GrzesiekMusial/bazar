import React, { useEffect, useState } from "react";

import * as images from "../../methods/image.js";

import AddImages from "./common/addImages";
import AddTextBox from "./common/addTextBox";

import * as base from "./common/base";

const AddBoard = (props) => {
    useEffect(() => {
        props.title("ogłoszenie");
    }, []);

    const [image, setImage] = useState([]);
    const [text, setText] = useState(null);
    const [title, setTitle] = useState(null);

    const handleSave = () => {
        base.addBoard(
            { image: image, text: text, title: title },
            props,
            "/board"
        );
    };

    return (
        <div className="screen">
            <div className="screen__container">
                <div className="addBoard">
                    <AddImages
                        image={image}
                        addImage={(i) =>
                            setImage((arr) => [...arr, images.add(i)])
                        }
                        handleClick={(i, index, arr) =>
                            setImage((arr) => images.wipe(i, arr))
                        }
                    />

                    <AddTextBox
                        changeText={(t) => setText(t)}
                        changeTitle={(t) => setTitle(t)}
                    />

                    <div className="addBoard__buttons">
                        <button className="actionBtn" onClick={handleSave}>
                            OPUBLIKUJ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBoard;
