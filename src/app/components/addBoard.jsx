import React, { useEffect, useState } from "react";

import * as images from "../../methods/image.js";

import AddImages from "./common/addImages";

import * as base from "./common/base";

import { Formik } from "formik";
import * as Yup from "yup";

import AddTextBox from "./common/form/addTextBox";
import AddInputBox from "./common/form/addInputBox.jsx";
import AddSubmitButton from "./common/form/submitButton.jsx";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(3).max(120),
    text: Yup.string().max(6000),
});

const AddBoard = (props) => {
    useEffect(() => {
        props.title("ogłoszenie");
    }, []);

    const [image, setImage] = useState([]);

    const handleSave = (item, image) => {
        item.image = image;
        base.addBoard(item, props);
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

                    <Formik
                        initialValues={{ text: "", title: "" }}
                        onSubmit={(values) => handleSave(values, image)}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit }) => (
                            <>
                                <AddInputBox
                                    className="addBoard__title"
                                    name="title"
                                    placeholder="Nazwa"
                                />
                                <AddTextBox
                                    className="addBoard__text"
                                    name="text"
                                    placeholder="Opis..."
                                />
                                <div className="addBoard__buttons">
                                    <AddSubmitButton
                                        className="actionBtn"
                                        title="OPUBLIKUJ"
                                    />
                                </div>
                            </>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddBoard;
