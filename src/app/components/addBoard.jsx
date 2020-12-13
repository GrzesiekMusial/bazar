import React, { useEffect, useState } from "react";

import * as base from "./common/base";

import { Formik } from "formik";
import * as Yup from "yup";

import AddTextBox from "./common/form/addTextBox";
import AddInputBox from "./common/form/addInputBox.jsx";
import AddSubmitButton from "./common/form/submitButton.jsx";
import MultiImageInput from "react-multiple-image-input";

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
                    <div className="multipleImages">
                        <MultiImageInput
                            allowCrop={false}
                            max={6}
                            images={image}
                            setImages={setImage}
                            theme={{
                                margin: "0",
                                background: "unset",
                                outlineColor: "#262a33",
                                textColor: "rgba(255,255,255,0.6)",
                                buttonColor: "#ff0e1f",
                                modalColor: "#ffffff",
                            }}
                        />
                    </div>

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
