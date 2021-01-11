import * as noticesBase from "../services/notices";
import * as productsBase from "../services/products";
import * as categoriesBase from "../services/categories";
import { cubby } from "./cubby";

const checkBase = async (cubby, base) => {
    const maxTime = 600000;
    if (!cubby.data || cubby.time - Date.now() > maxTime) {
        console.log("pobieram");
        cubby.time = Date.now();
        const result = await base.get();
        let final;
        final = cubby.data = result.data;
        return final;
    } else return cubby.data;
};

const getOne = async (id, base, setData = null, setImage = null) => {
    if (id) {
        const value = await base.filter(async (item) => item._id === id)[0];
        console.log(value, " VALUE");
        if (!setData) return value;
        setData(value);
        if (setImage) setImage(value.images);
    }
    return true;
};

const getOneNotice = async (id, setData, setImage) => {
    const notices = await checkBase(cubby.notices, noticesBase);
    return await getOne(id, notices, setData, setImage);
};

const getOneProduct = async (id, setData, setImage) => {
    const products = await checkBase(cubby.products, productsBase);
    return await getOne(id, products, setData, setImage);
};

const getNotices = async (setData = null) => {
    const notices = await checkBase(cubby.notices, noticesBase);
    if (setData) return setData(notices);
    return notices;
};

const getProducts = async (setData = null) => {
    const products = await checkBase(cubby.products, productsBase);
    if (setData) return setData(products);
    return products;
};

const getCategories = async (withAll = false, setData = false) => {
    const categories = await checkBase(cubby.categories, categoriesBase);
    console.log(categories, "categories");
    const result = withAll
        ? [{ _id: "0", name: "wszystkie" }, ...categories]
        : [...categories];

    if (setData) return setData(result);
    return result;
};

export { getOneNotice, getOneProduct, getNotices, getProducts, getCategories };
