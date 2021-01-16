import React, { useEffect, useState } from "react";
import { Formik } from "formik";

import config from "../../config/config.json";

import { validationSchema } from "./models/board";
import * as Forms from "../common/form/forms";
import * as base from "../../../methods/data";
import Spinner from "../common/spinner";
import { useHistory } from "react-router-dom";

const AddBoard = (props, toast) => {
    const [image, setImage] = useState([]);
    const [edit, setEdit] = useState(null);
    const [load, setLoad] = useState(true);

    const { title, history, match } = props;
    const back = useHistory();

    useEffect(async () => {
        try {
            title(config.headers.newPost);
            await base.getOneNotice(match.params.id, setEdit, setImage);
            setLoad(false);
        } catch (ex) {
            return back.push(props.location.back, props.location.state);
        }
    }, []);

    const handleSave = async (values) => {
        try {
            await base.noticeSave(values, edit, image);
            if (props.location.back)
                back.push(props.location.back, props.location.state);
            else back.push("/board");
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
                        onSubmit={(values) => {
                            handleSave(values);
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
        </main>
    );
};

export default AddBoard;
