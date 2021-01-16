import { toast, Flip } from "react-toastify";

import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";
import { cubby } from "./cubby";

const noticeSave = async (item, edit, image) => {
    return await save(item, edit, image, noticeBase, cubby.notices);
};

const productSave = async (item, edit, image) => {
    item.price = await checkPrice(item.price);
    return await save(item, edit, image, productBase, cubby.products);
};

const save = async (item, edit, image, base, cubby) => {
    item.images = await checkImage(image);

    const form = new FormData();

    if (item.images.new.length > 0)
        for (const img of item.images.new) {
            form.append("file", img);
        }
    form.append("title", item.title);
    form.append("text", item.text);
    form.append("price", item.price);
    form.append("category", item.category);

    let response;
    if (edit) {
        if (item.images.old.length > 0)
            for (const img of item.images.old) {
                form.append("images", img);
            }

        form.append("_id", edit._id);

        response = await base.edit(edit._id, form);
    } else {
        response = await base.add(form);
    }
    if (!response.ok)
        throw toast.error("Can't save! please check internet connection");
    if (cubby.data) {
        if (edit) {
            cubby.data = cubby.data.filter((item) => item._id !== edit._id);
        }

        const newCube = response.data.item;

        if (response.data.item.category) {
            const id = newCube.category;
            newCube.category = {};
            newCube.category._id = id;
        }
        newCube.author = response.data.author;
        cubby.data.unshift(newCube);
    }
    toast.success("saved");
    return response.data.item;
};

const checkImage = async (images) => {
    const result = { old: [], new: [] };

    for await (const img of images) {
        typeof img === "string" ? result.old.push(img) : result.new.push(img);
    }

    return result;
};

const checkPrice = async (price) => {
    try {
        if (price) {
            price = price.trim();
            price = +parseFloat(price).toFixed(2);
        } else {
            price = 0;
        }
    } catch (e) {}
    price = price.toString();
    return price;
};

export { noticeSave, productSave };
