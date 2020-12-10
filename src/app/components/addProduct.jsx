import React, { useState, useEffect } from "react";

import AddImages from "./common/addImages";
import AddTextBox from "./common/addTextBox";

import * as images from "../../methods/image.js";
import * as base from "./common/base";

const AddProduct = (props) => {
    const [image, setImage] = useState([]);
    const [price, setPrice] = useState(null);
    const [text, setText] = useState(null);
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);

    const categories = ["INNE", "SPIŻARNIA", "MODA", "ELEKTRONIKA", "DOMOWE"];

    useEffect(() => {
        props.title("sprzedaj");
    }, []);

    const accept = () => {
        const data = {
            image: image,
            price: price,
            text: text,
            title: title,
            category: category,
        };

        base.addProduct(data, props);
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

                    <div className="addBoard__details">
                        <div>
                            <label for="price">CENA</label>
                            <input
                                placeholder="podaj cenę"
                                onChange={(e) =>
                                    console.log(setPrice(e.currentTarget.value))
                                }
                                id="price"
                                className="addBoard__details--price"
                            ></input>
                        </div>

                        <div>
                            <label for="category">KATEGORIA</label>
                            <select
                                defaultChecked="INNE"
                                onChange={(e) =>
                                    console.log(
                                        setCategory(e.currentTarget.value)
                                    )
                                }
                                class="addBoard__details--category"
                                id="category"
                            >
                                {categories.map((cat, index) => (
                                    <option selected={index === 0}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="addBoard__buttons">
                        <button className="actionBtn" onClick={accept}>
                            OPUBLIKUJ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
