import { apiClient as client } from "./client";
const endpoint = "/products";

const get = async () => await client.get(endpoint);

const getOne = async (id) => await client.get(`${endpoint}/${id}`);

const add = async (body) => await client.post(endpoint, body);

const edit = async (id, body) => await client.put(`${endpoint}/${id}`, body);

const remove = async (body) => await client.delete(endpoint + "/" + body);

export { get, add, edit, remove, getOne };
