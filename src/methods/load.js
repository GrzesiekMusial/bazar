import * as noticeBase from "../services/notices";
import * as productBase from "../services/products";
import * as catBase from "../services/categories";

const data = {
    products: {
        time: 0,
        data: null,
    },
    notices: {
        time: 0,
        data: null,
    },
    categories: {
        time: 0,
        data: null,
    },
};

const getOne = async (id, base, setData = null, setImage = null) => {
    if (id) {
        const response = await base.getOne(id);
        if (!response.ok) throw Error;
        if (!setData) return response.data;
        setData(response.data);
        if (setImage) setImage(response.data.images);
    }
    return true;
};

const getOneNotice = async (id, setData, setImage) => {
    return await getOne(id, noticeBase, setData, setImage);
};

const getOneProduct = async (id, setData, setImage) => {
    return await getOne(id, productBase, setData, setImage);
};

const getNotices = async (setData = null) => {
    const notices = await noticeBase.get();
    if (!Array.isArray(notices.data)) throw Error;
    if (setData) return setData(notices.data);
    return notices.data;
};

const getProducts = async (setData = null) => {
    const products = await productBase.get();
    if (!Array.isArray(products.data)) throw Error;
    if (setData) return setData(products.data);
    return products.data;
};

const getCategories = async (withAll = false, setData = false) => {
    const categories = await catBase.get();
    if (!Array.isArray(categories.data)) throw Error;
    const result = withAll
        ? [{ _id: "0", name: "wszystkie" }, ...categories.data]
        : [...categories.data];

    if (setData) return setData(result);
    return result;
};

export { getOneNotice, getOneProduct, getNotices, getProducts, getCategories };
