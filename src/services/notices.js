import { apiClient as client } from "./client";

const endpoint = "/notices";

const get = () => client.get(endpoint);

const getOne = (id) => client.get(`${endpoint}/${id}`);

const add = (body) => client.post(endpoint, body);

const edit = (id, body) => client.put(`${endpoint}/${id}`, body);

const remove = (body) => client.delete(endpoint + "/" + body);

export { get, add, edit, remove, getOne };
