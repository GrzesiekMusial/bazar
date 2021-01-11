import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validationSchema } from "./models/product";

import * as Forms from "../common/form/forms";
import * as base from "../../../methods/data";

const AddProduct = (props) => {
    const { title, history, match } = props;
    const [image, setImage] = useState([]);
    const [categories, setCategories] = useState(null);
    const [edit, setEdit] = useState(null);

    useEffect(async () => {
        title("sprzedaj");
        const cat = await base.getCategories();
        if (!cat) return history.push("/add");
        setCategories(cat);

        if (!match.params.id) return;

        const prod = await base.getOneProduct(
            match.params.id,
            setEdit,
            setImage
        );
        if (!prod) history.push("/add");
    }, []);

    const handleSave = async (values) => {
        const result = await base.productSave(values, edit, image);
        console.log(result);
        // if (result) return history.push(`/bazar/product/${result._id}`);
    };

    const handleDelete = async (id) => {
        console.log(id);
        const result = image.filter((img) => img !== id && img.name !== id);
        console.log(result);
        setImage(result);
    };

    return (
        <div className="screen">
            {categories && (
                <div className="screen__container">
                    <div className="addBoard">
                        <ToastContainer />

                        <div className="addBoard__images">
                            <Forms.Image
                                handleChange={setImage}
                                preview={image}
                                handleDelete={handleDelete}
                            />
                        </div>

                        <Formik
                            enableReinitialize={true}
                            initialValues={
                                edit
                                    ? {
                                          text: edit.text,
                                          title: edit.title,
                                          price: edit.price,
                                          category: edit.category._id,
                                      }
                                    : {
                                          text: "",
                                          title: "",
                                          price: "",
                                          category: categories[0]._id,
                                      }
                            }
                            onSubmit={(values) => handleSave(values, image)}
                            validationSchema={validationSchema}
                        >
                            {({}) => (
                                <>
                                    <Forms.Input
                                        className="addBoard__title"
                                        name="title"
                                        placeholder="Nazwa"
                                        defaultValue={edit ? edit.title : null}
                                    />

                                    <Forms.Text
                                        className="addBoard__text"
                                        name="text"
                                        placeholder="Opis..."
                                        defaultValue={edit ? edit.text : null}
                                    />

                                    <div className="addBoard__details">
                                        <div>
                                            <Forms.Input
                                                label="CENA"
                                                placeholder="cena"
                                                name="price"
                                                id="price"
                                                className="addBoard__details--price"
                                                defaultValue={
                                                    edit ? edit.price : null
                                                }
                                            />
                                        </div>

                                        <div>
                                            {categories && (
                                                <Forms.Select
                                                    label="KATEGORIA"
                                                    arr={categories}
                                                    id="category"
                                                    name="category"
                                                    className="addBoard__details--category"
                                                    defaultValue={
                                                        edit
                                                            ? edit.category._id
                                                            : null
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="addBoard__buttons">
                                        <Forms.Submit
                                            className="actionBtn"
                                            title={
                                                edit ? "ZAPISZ" : "OPUBLIKUJ"
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
