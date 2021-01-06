import { apiClient as client } from "./client";

const endpoint = "/images";

const add = async (body) => {
    const result = await client.post(endpoint, body, {
        "Content-Type": "multipart/form-data",
    });
    return result;
};

const get = (body) => {
    return `http://192.168.56.1:3000${endpoint}/${body}`;
};

const remove = async (body) => await client.delete(`${endpoint}/${body}`);

export { add, get, remove };
