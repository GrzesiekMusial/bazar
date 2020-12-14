import React, { useState, useEffect } from "react";

import * as base from "./common/base";

import { Formik } from "formik";
import * as Yup from "yup";

import AddTextBox from "./common/form/addTextBox";
import AddInputBox from "./common/form/addInputBox";
import AddSelectBox from "./common/form/addSelectBox";
import AddSubmitButton from "./common/form/submitButton";
import MultiImageInput from "react-multiple-image-input";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Nazwa jest wymagana.")
        .min(3)
        .typeError("Nieprawidłowa wartość.")
        .max(120)
        .label("Nazwa"),
    text: Yup.string().max(6000),
    price: Yup.number()
        .typeError("Nieprawidłowa wartość.")
        .max(9000000)
        .test("is-decimal", "invalid decimal", (value) =>
            (value + "").match(/^\d*\.{1}\d{2}/)
        ),
    category: Yup.string().required().max(20),
});

const AddProduct = (props) => {
    const [image, setImage] = useState([]);

    const categories = ["INNE", "SPIŻARNIA", "MODA", "ELEKTRONIKA", "DOMOWE"];

    useEffect(() => {
        props.title("sprzedaj");
    }, []);

    const handleSave = (item, image) => {
        item.price = parseFloat(item.price.match(/^\d*\.{1}\d{2}/)[0]);
        item.image = image;
        base.addProduct(item, props);
    };

    return (
        <div className="screen">
            <div className="screen__container">
                <div className="addBoard">
                    <div className="multipleImages"></div>

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
                        initialValues={{
                            text: "",
                            title: "",
                            price: "",
                            category: "INNE",
                        }}
                        onSubmit={(values) => handleSave(values, image)}
                        validationSchema={validationSchema}
                    >
                        {({}) => (
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

                                <div className="addBoard__details">
                                    <div>
                                        <AddInputBox
                                            label="CENA"
                                            placeholder="cena"
                                            name="price"
                                            id="price"
                                            className="addBoard__details--price"
                                        />
                                    </div>

                                    <div>
                                        <AddSelectBox
                                            label="KATEGORIA"
                                            arr={categories}
                                            id="category"
                                            name="categories"
                                            className="addBoard__details--category"
                                        />
                                    </div>
                                </div>

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

export default AddProduct;
