import { toast } from "react-toastify";
import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";
import { cubby } from "./cubby";

const noticeDelete = async (item) => {
    return await dlt(item, noticeBase, cubby.notices);
};

const productDelete = async (item) => {
    return dlt(item, productBase, cubby.products);
};

const dlt = async (item, base, cubby) => {
    const result = await base.remove(item._id);
    if (!result.ok)
        throw toast.error("Error when delete. " + result.originalError.message);
    if (cubby.data)
        cubby.data = await cubby.data.filter(
            async (old) => old._id !== item._id
        );
    return result.data;
};

export { noticeDelete, productDelete };
