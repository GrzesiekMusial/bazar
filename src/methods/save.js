import { toast } from "react-toastify";

import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";

const noticeSave = async (item, edit, image) => {
    return await save(item, edit, image, noticeBase);
};

const productSave = async (item, edit, image) => {
    item.price = await checkPrice(item.price);
    return await save(item, edit, image, productBase);
};

const save = async (item, edit, image, base) => {
    item.images = await checkImage(image);

    const form = new FormData();
    console.log("IMAGES ", item.images);
    console.log(item.images, "IMAGES");
    if (item.images.new.length > 0)
        item.images.new.forEach((img) => form.append("file", img));
    form.append("title", item.title);
    form.append("text", item.text);
    form.append("price", item.price);
    form.append("category", item.category);

    if (edit) {
        if (item.images.old.length > 0) form.append("images", item.images.old);
        form.append("_id", edit._id);

        const response = await base.edit(edit._id, form);
        if (!response.ok) throw toast.error("Error occured on saving!");
        return response.data;
    }

    const response = await base.add(form);
    if (!response.ok) throw toast.error(response.data);
    return response.data;
};

const checkImage = async (images) => {
    const result = { old: [], new: [] };

    await images.forEach((img) =>
        typeof img === "string" ? result.old.push(img) : result.new.push(img)
    );

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