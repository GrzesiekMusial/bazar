import { toast } from "react-toastify";
import * as imageBase from "../services/images";
import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";

const noticeDelete = async (card) => {
    return await dlt(card, noticeBase);
};

const productDelete = async (card) => {
    return dlt(card, productBase);
};

const dlt = async (card, base) => {
    try {
        card.images.forEach((img) => imageBase.remove(img));
        const result = await base.remove(card._id);
        if (!result.ok)
            throw toast.error(
                "Error when delete. " + result.originalError.message
            );
        return result.data;
    } catch (ex) {
        if (ex.response && ex.response.status === 404)
            throw toast.error("This product has already been deleted.");
        throw toast.error("Error when delete.");
    }
};

export { noticeDelete, productDelete };
