import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validationSchema } from "./models/board";

import * as Forms from "../common/form/forms";
import * as base from "../../../methods/data";

const AddBoard = (props) => {
    const [image, setImage] = useState([]);
    const [edit, setEdit] = useState(null);

    const { title, history, match } = props;

    useEffect(async () => {
        try {
            title("ogłoszenie");
            await base.getOneNotice(match.params.id, setEdit, setImage);
        } catch (ex) {
            history.push("/add");
        }
    }, []);

    const handleSave = async (values) => {
        const result = await base.noticeSave(values, edit, image);
        if (result) history.push("/board");
    };

    const handleDelete = async (id) => {
        console.log(id);
        const result = image.filter((img) => img !== id && img.name !== id);
        console.log(result);
        setImage(result);
    };

    return (
        <div className="screen">
            <ToastContainer />
            <div className="screen__container">
                <div className="addBoard">
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
                                  }
                                : {
                                      text: "",
                                      title: "",
                                  }
                        }
                        onSubmit={(values) => handleSave(values)}
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
                                <div className="addBoard__buttons">
                                    <Forms.Submit
                                        className="actionBtn"
                                        title={edit ? "ZAPISZ" : "OPUBLIKUJ"}
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
