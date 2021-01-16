import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validationSchema } from "./models/product";
import config from "../../config/config.json";

import * as Forms from "../common/form/forms";
import * as base from "../../../methods/data";
import Spinner from "./../common/spinner";
import { useHistory } from "react-router-dom";

const AddProduct = (props) => {
    const { title, history, match } = props;
    const [image, setImage] = useState([]);
    const [categories, setCategories] = useState(null);
    const [edit, setEdit] = useState(null);
    const [load, setLoad] = useState(true);

    const back = useHistory();

    useEffect(async () => {
        title(config.headers.newSell);
        const cat = await base.getCategories();
        if (!cat) return history.push("/add");
        setCategories(cat);

        if (!(await base.getOneProduct(match.params.id, setEdit, setImage)))
            history.push("/add");

        setLoad(false);
    }, []);

    const handleSave = async (values) => {
        try {
            await base.productSave(values, edit, image);
            if (props.location.back)
                return back.push(props.location.back, props.location.state);
            back.push("/bazar");
        } catch (ex) {
            setLoad(false);
        }
    };

    const handleDelete = async (id) => {
        const result = image.filter((img) => img !== id && img.name !== id);
        setImage(result);
    };

    return (
        <main className="screen">
            {load && <Spinner />}
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
                                          category: "5fd8b9b913047e50104c37bd",
                                      }
                            }
                            onSubmit={(values) => {
                                handleSave(values, image);
                                setLoad(true);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({}) => (
                                <>
                                    <Forms.Input
                                        className="addBoard__title"
                                        name="title"
                                        placeholder={config.info.title}
                                        defaultValue={edit ? edit.title : null}
                                    />

                                    <Forms.Text
                                        className="addBoard__text"
                                        name="text"
                                        placeholder={config.info.description}
                                        defaultValue={edit ? edit.text : null}
                                    />

                                    <div className="addBoard__details">
                                        <div>
                                            <Forms.Input
                                                label={config.info.price}
                                                placeholder={config.info.price.toLowerCase()}
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
                                                    label={config.info.category}
                                                    arr={categories}
                                                    id="category"
                                                    name="category"
                                                    className="addBoard__details--category"
                                                    defaultValue={
                                                        edit
                                                            ? edit.category._id
                                                            : "5fd8b9b913047e50104c37bd"
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="addBoard__buttons">
                                        <Forms.Submit
                                            className="actionBtn"
                                            title={config.actions.save}
                                        />
                                    </div>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AddProduct;
