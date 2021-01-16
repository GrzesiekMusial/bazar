import { set } from "lodash";
import { toast, Flip } from "react-toastify";
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
            "Delete error - please chceck internet connection and try again! " +
                {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    transition: Flip,
                }
        );
    if (cubby.data)
        cubby.data = cubby.data.filter((old) => old._id !== item._id);
    if (setData) setData(cubby.data);

    toast.success("deleted");

    return cubby.data;
};

export { noticeDelete, productDelete };
