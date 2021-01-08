import { toast } from "react-toastify";
import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";

const noticeDelete = async (card) => {
    return await dlt(card, noticeBase);
};

const productDelete = async (card) => {
    return dlt(card, productBase);
};

const dlt = async (card, base) => {
    console.log("delete", card);

    try {
        console.log("delete", card);
        const result = await base.remove(card._id);
        if (!result.ok)
            throw toast.error(
                "Error when delete. " + result.originalError.message
            );
        console.log(result);
        return result.data;
    } catch (ex) {
        if (ex.response && ex.response.status === 404)
            throw toast.error("This product has already been deleted.");
        throw toast.error("Error when delete.");
    }
};

export { noticeDelete, productDelete };
