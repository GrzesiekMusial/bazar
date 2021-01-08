import { apiClient as client } from "./client";

const endpoint = "/products";

const get = () => client.get(endpoint);

const getOne = (id) => client.get(`${endpoint}/${id}`);

const add = async (body) => await client.post(endpoint, body);

const edit = (id, body) => client.put(`${endpoint}/${id}`, body);

const remove = async (body) => await client.delete(endpoint + "/" + body);

export { get, add, edit, remove, getOne };
