import { toast } from "react-toastify";

import * as imagesBase from "../services/images";
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
    item.images = await imageSave(item, edit, image);

    if (edit) {
        item._id = edit._id;
        const response = await base.edit(item);
        if (!response.ok) throw toast.error("Error occured on saving!");
        return response.data;
    }

    console.log("ITEM", item);
    const response = await base.add(item);
    if (!response.ok) throw toast.error(response.data);
    return response.data;
};

const imageSave = async (item, edit, image) => {
    if (!(image.length > 0 && typeof image[0] !== "string")) return item.images;

    if (edit) edit.images.forEach((img) => imagesBase.remove(img));

    const response = await uploadImage(image);
    if (response.ok) return response.data;
    else throw toast.error("Error occured on saving!");
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
    return price;
};

const uploadImage = (image) => {
    const form = new FormData();
    image.forEach((img) => form.append("image", img));
    return imagesBase.add(form);
};

export { noticeSave, productSave };
