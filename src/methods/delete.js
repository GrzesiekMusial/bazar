import { toast } from "react-toastify";
import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";
import { cubby } from "./cubby";

const noticeDelete = async (item, setData = false) => {
    return await dlt(item, noticeBase, cubby.notices, setData);
};

const productDelete = async (item, setData = false) => {
    return dlt(item, productBase, cubby.products, setData);
};

const dlt = async (item, base, cubby, setData) => {
    const result = await base.remove(item._id);
    if (!result.ok)
        throw toast.error(
            "Delete error - please chceck internet connection and try again! "
        );
    if (cubby.data)
        cubby.data = cubby.data.filter((old) => old._id !== item._id);
    if (setData) setData(cubby.data);

    toast.success("deleted");

    return cubby.data;
};

export { noticeDelete, productDelete };
